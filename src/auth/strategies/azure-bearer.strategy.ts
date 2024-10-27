import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { BearerStrategy, IBearerStrategyOptionWithRequest,ITokenPayload, VerifyCallback } from "passport-azure-ad";
import { authConfig } from "../auth.config";
import { authConstants } from "../auth.constants";

@Injectable()
export class AzureBearerStrategy extends PassportStrategy(BearerStrategy, authConstants.AZURE_AD){
    constructor(){
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
    async validate(req: Request, token: ITokenPayload, done: VerifyCallback): Promise<any> {
        try {
            if (!token) {
                throw new Error('Token is not found');
            }
  
        console.log('Token:', token);
  
        // トークンの検証ロジックを追加
        // const user = await this.usersService.findOrCreateUser(token);
        // return done(null, user);
        } catch (error) {
            console.error('Authentication failed:', error.message);
            return done(error, false);
        }
    }
}
