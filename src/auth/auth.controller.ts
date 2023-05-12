import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/auth/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return await this.authService.login(req.user);
  }

  // @ApiOperation({ summary: '获取用户信息' })
  // @ApiBearerAuth() // swagger文档设置token
  // @UseGuards(AuthGuard('jwt'))
  // @Get()
  // getUserInfo(@Req() req) {
  //   return req.user;
  // }
}
