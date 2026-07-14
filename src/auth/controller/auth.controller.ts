import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../../user/dto/registerUser.dto';
import { LoginUserDto } from '../../user/dto/loginUser.dto';
import { AuthGuard } from '../guard/auth.guard';
import { UserRepository } from '../../user/repositories/user.repositories';

@Controller('auth') // auth/register
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return { access_token: token };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    // Login
    // 1. Recive User data( email, password)
    // 2. Match email and password
    // 3. If match generate JWT token
    const token = await this.authService.loginUser(loginUserDto);
    return { access_token: token };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userEmail = req.user.email;
    const user = await this.userRepository.findOneByEmail(userEmail);
    return {
      id: user?.id,
      fname: user?.fname,
      lname: user?.lname,
      email: user?.email,
      role: user?.role,
    };
  }
}
