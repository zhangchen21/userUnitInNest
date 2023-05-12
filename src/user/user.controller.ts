import { Controller, Post, UseGuards, Request, Body, UseInterceptors, ClassSerializerInterceptor, Get, Req, Query, Param, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: UserInfoDto })
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.userService.register(user);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserInfo(@Req() req) {
    return req.user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
