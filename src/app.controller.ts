import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AzureADGuard } from './guards/azure-ad-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @UseGuards(AzureADGuard)
  getHello(): string {
    return this.appService.getHello();
  } 

  @Get('goodbye')
  getGoodbye(): string {
    return this.appService.getGoodbye();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
}