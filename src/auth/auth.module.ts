import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from 'src/user/entity/user.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET', 'test123456'),
      signOptions: { expiresIn: '24h' },
    };
  },
});

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    jwtModule,
    UserModule
	],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [jwtModule],
})
export class AuthModule {}
