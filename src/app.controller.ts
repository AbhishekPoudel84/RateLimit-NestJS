import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipThrottle()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers() {
    return {
      message: 'Multiple request are being sent.',
    };
  }

  @Throttle(3, 15)
  @Get('users/info')
  getUsersInfo() {
    return { message: 'This is user info tab' };
  }
}
