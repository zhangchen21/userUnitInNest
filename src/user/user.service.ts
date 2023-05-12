import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(createUser: CreateUserDto) {
    // Find if there is already a user
    const { username } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if(existUser){
        throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST)
    }

    // Create new user
    const newUser = this.userRepository.create(createUser);
    return await this.userRepository.save(newUser);
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, newUser: UpdateUserDto): Promise<UserEntity> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    if (!userToUpdate) {
      throw new HttpException("用户名不存在", HttpStatus.BAD_REQUEST)
    }

    for (const key of Object.keys(newUser) as Array<keyof UpdateUserDto>) {
      userToUpdate[key] = newUser[key];
    }

    return await this.userRepository.save(userToUpdate);
  }
}
