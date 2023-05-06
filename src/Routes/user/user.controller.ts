import { Body, Controller, Get, Post , Req  } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

	@Post('signup')
	async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
	}

  @Post('signin')
  async find(@Req() request: Request): Promise<string> {
    return this.userService.getHello();
  }
}
