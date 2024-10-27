import { Controller, Get} from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('token')
    async getToken() {
        const accessToken = await this.authService.getAccessToken();
        return accessToken;
    }
}