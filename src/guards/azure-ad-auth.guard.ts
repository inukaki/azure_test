import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authConstants } from '../auth/auth.constants';

@Injectable()
export class AzureADGuard extends AuthGuard(authConstants.AZURE_AD) {}