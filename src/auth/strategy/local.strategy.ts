import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { UserEntity } from '../../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
   
    super({
      usernameField: 'phone',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(phone: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.phone = :phone', { phone })
      .getOne();

    if (!user) {
      throw new BadRequestException('手机号未注册！');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误！');
    }

    return user;
  }
}