import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entity/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'test123456',
    } as StrategyOptions);
  }

  async validate(user: Partial<UserEntity>) {
    const existUser = await this.authService.getUser(user);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }
    return existUser;
  }
}