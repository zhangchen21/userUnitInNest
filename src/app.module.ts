import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from '../config/env';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'Zc1582869459500.',
    //   database: 'auth',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: false,
    // }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', '127.0.0.0'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWORD', 'root'),
        database: configService.get('DB_DATABASE', 'blog'),
        // charset: 'utf8mb4',
        timezone: '+08:00',
        synchronize: false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
