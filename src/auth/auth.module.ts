import { Module } from "@nestjs/common";
import { AzureBearerStrategy } from "./strategies/azure-bearer.strategy";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [AuthController],
    providers: [AzureBearerStrategy, AuthService],
})
export class AuthModule {}