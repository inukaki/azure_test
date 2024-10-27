import { AuthenticationResult, ConfidentialClientApplication } from '@azure/msal-node';
import { Inject, Injectable } from '@nestjs/common';
import { authConstants } from '../auth.constants';

@Injectable()
export class AzureADTokensRepository {
    constructor(
        @Inject(authConstants.CONFIDENTIAL_CLIENT_APPLICATION) 
        private readonly cca: ConfidentialClientApplication,
    ) {}

    // ユーザのアクセストークンを使用して新しいアクセストークンを所得する。
    public async acquireOnBehalfOf(accessToken: string, scopes: string[]): Promise<AuthenticationResult> {
        const authenticationResult: AuthenticationResult | null = await this.cca.acquireTokenOnBehalfOf({
        oboAssertion: accessToken,
        scopes: scopes,
        });

        if (authenticationResult) {
        return authenticationResult;
        } else {
        throw new Error('authenticationResult was null');
        }
    }

    public async acquireByClientCredential(): Promise<AuthenticationResult> {
        const authenticationResult: AuthenticationResult | null = await this.cca.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default'],
        });

        if (authenticationResult) {
        return authenticationResult;
        } else {
        throw new Error('authenticationResult was null');
        }
    }
}