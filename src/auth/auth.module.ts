import { Module } from "@nestjs/common";
import { AzureBearerStrategy } from "./strategies/azure-bearer.strategy";
import { AuthController } from "./controller/auth.controller";
import { AzureADTokensRepository } from "./repositories/azure-ad-tokens.repository";
import { AuthService } from "./service/auth.service";
import { HttpModule } from "@nestjs/axios";
import { authConstants } from "./auth.constants";
import { PassportModule } from "@nestjs/passport";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { authConfig } from "./auth.config";

@Module({
    imports: [HttpModule, PassportModule.register({ defaultStrategy: authConstants.AZURE_AD })],
    controllers: [AuthController],
    providers: [AzureBearerStrategy, AuthService, 
        AzureADTokensRepository,
        {
            provide: authConstants.CONFIDENTIAL_CLIENT_APPLICATION,
            useFactory: () => {
                return new ConfidentialClientApplication({
                    auth: {
                        clientId: authConfig.credentials.clientID,
                        authority: `https://login.microsoftonline.com/${authConfig.credentials.tenantID}`,
                        clientSecret: authConfig.credentials.clientSecret,
                    },
                });
            },
        },
    ],
    exports: [authConstants.CONFIDENTIAL_CLIENT_APPLICATION]
})
export class AuthModule {}