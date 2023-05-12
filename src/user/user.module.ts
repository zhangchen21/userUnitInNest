import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule
	],
  controllers: [UserController],
  providers: [UserService, UserEntity],
  exports: [UserService]
})
export class UserModule {}
