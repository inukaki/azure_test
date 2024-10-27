import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { AzureADUser } from '../types/AzureADUser';

@Injectable()
export class AzureADUsersRepository {
  public async findOne(accessTokenForMicrosoftGraph: string): Promise<AzureADUser> {
    const azureADUserResponse: AxiosResponse<AzureADUser> = await axios.get('/me', {
      baseURL: 'https://graph.microsoft.com/v1.0',
      headers: {
        Authorization: `Bearer ${accessTokenForMicrosoftGraph}`,
      },
      params: {
        $select: 'id,officeLocation',
      },
    });

    return azureADUserResponse.data;
  }
}