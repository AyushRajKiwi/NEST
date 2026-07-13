import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../../user/dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../user/dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Logic for User Registation
  // 1. check if user already exists
  // 2. hash the password
  // 3. store the user in the database
  // 4. generate a JWT token
  // 5. send token in response

  async registerUser(registerUserDto: RegisterDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    console.log(token);
    return token;
  }
  async loginUser(loginUserDto: LoginUserDto) {
    // 1. check if user exists
    // 2. compare the password
    // 3. generate a JWT token
    // 4. send token in response
    const user = await this.userService.validateUser(loginUserDto);
    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    console.log('THIS IS THE GENERATED TOKEN:', token);
    return token;
  }
}
