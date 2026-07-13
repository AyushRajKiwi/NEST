import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/user/dto/registerUser.dto';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async createUser(registerUserDto: RegisterDto) {
    try {
      const userEntity = this.usersRepository.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
        role: registerUserDto.role,
      });
      return await this.usersRepository.save(userEntity);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err as { code?: string };
      const DUPLICATE_KEY_CODE = '23505';
      if (errorMessage.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('User already exists');
      }
      throw err;
    }
  }
  async findOneByEmail(email: string): Promise<User | null> {
    const checkUser = await this.usersRepository.findOne({
      where: { email: email },
    });
    return checkUser;
  }
}
