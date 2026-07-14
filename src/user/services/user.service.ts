import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/user/dto/registerUser.dto';
import { UserRepository } from '../repositories/user.repositories';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository) {}

  async createUser(registerUserDto: RegisterDto) {
    return await this.UserRepository.createUser(registerUserDto);
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const existingUser = await this.UserRepository.findOneByEmail(
      loginUserDto.email,
    );
    const invalidCredentialsError = new UnauthorizedException(
      'Invalid email or password',
    );
    if (!existingUser) {
      throw invalidCredentialsError;
    }
    const isPasswordMatching = await bcrypt.compare(
      loginUserDto.password,
      existingUser.password,
    );
    if (!isPasswordMatching) {
      throw invalidCredentialsError;
    }
    return existingUser;
  }
}
