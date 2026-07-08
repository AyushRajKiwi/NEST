import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // auth/register
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register() {
    const result = this.authService.register();
    return result;
  }
}
