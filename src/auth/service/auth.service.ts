import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { authConfig } from '../auth.config';
import axios from 'axios';

@Injectable()
export class AuthService {
    private readonly tenantId = authConfig.credentials.tenantID;
    private readonly clientId = authConfig.credentials.clientID;
    private readonly clientSecret = authConfig.credentials.clientSecret;
    private readonly scope = "https://graph.microsoft.com/.default";
    // private readonly scope = "https://graph.microsoft.com/User.Read";

    constructor(private readonly httpService: HttpService) {}

    public async getAccessToken(): Promise<string> {
    const tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;

    const formData = new URLSearchParams();
    formData.append('client_id', this.clientId);
    formData.append('scope', this.scope);
    formData.append('client_secret', this.clientSecret);
    formData.append('grant_type', 'client_credentials');

    try {
        const response = await axios.post(tokenUrl, formData)
        return response.data.access_token
    } catch (error) {
        throw new Error(`Failed to retrieve access token: ${error.message}`);
    }
  }
}
