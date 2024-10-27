import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { BearerStrategy, IBearerStrategyOptionWithRequest,ITokenPayload, VerifyCallback } from "passport-azure-ad";
import { authConfig } from "../auth.config";
import { authConstants } from "../auth.constants";
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationResult } from "@azure/msal-node";
import { AzureADTokensRepository } from "../repositories/azure-ad-tokens.repository";

@Injectable()
export class AzureBearerStrategy extends PassportStrategy(BearerStrategy, authConstants.AZURE_AD){
    constructor(
        private readonly azureADTokenRepository: AzureADTokensRepository,
    ){
        super({
            identityMetadata: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
            issuer: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}`,
            clientID: authConfig.credentials.clientID,
            audience: authConfig.credentials.clientID,
            // validateIssuer: authConfig.settings.validateIssuer,
            // passReqToCallback: authConfig.settings.passReqToCallback,
            loggingLevel: authConfig.settings.loggingLevel,
            loggingNoPII: authConfig.settings.loggingNoPII,
        }as IBearerStrategyOptionWithRequest);
    }
    async validate(req: Request, done: VerifyCallback): Promise<any> {
        try {
            console.log(1111);
            const authenticationResult: AuthenticationResult = await this.azureADTokenRepository.acquireOnBehalfOf(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                req.headers.authorization!.split(' ')[1],
                ['https://graph.microsoft.com/User.Read'],
              );
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new Error('Authorization header is not found');
            }
            if (!authHeader.startsWith('Bearer ')) {
                throw new Error('Invalid token format');
            }
            const token = authHeader.split(' ')[1];

            if (!token) {
                throw new Error('Token is not found');
            }
            const decodedToken = jwt.verify(token) as ITokenPayload;
            console.log('Token:', token);
            console.log('Decoded token:', decodedToken);
  
            // トークンの検証ロジックを追加
            // const user = await this.usersService.findOrCreateUser(token);
            // return done(null, user);
        } catch (error) {
            console.error('Authentication failed:', error.message);
            return done(error, false);
        }
    }
}
