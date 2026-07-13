import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enum/user.types';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fname!: string;

  @IsString()
  lname!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsEnum(Role)
  role?: Role;
}
