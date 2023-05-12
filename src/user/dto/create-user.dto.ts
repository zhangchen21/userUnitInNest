/*
  create-user.dto.ts
*/
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty({ message: '账号必填' })
	@ApiProperty({ description: '用户账号' })
	readonly username: string;

	@IsNotEmpty({ message: '密码必填' })
	@ApiProperty({ description: '用户密码' })
	readonly password: string;

	@IsNotEmpty({ message: '手机号必填' })
	@ApiProperty({ description: '用户手机号' })
	readonly phone: string;

	@IsNotEmpty({ message: '地域必填' })
	@ApiProperty({ description: '用户地域' })
	readonly area: string;
}
  