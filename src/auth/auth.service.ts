import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<UserEntity>) {
    const token = this.createToken({
      id: user.id,
      phone: user.phone,
    });

    return { token };
  }

  async getUser(user: Partial<UserEntity>) {
    return await this.userService.findOne(user.id);
  }
}
