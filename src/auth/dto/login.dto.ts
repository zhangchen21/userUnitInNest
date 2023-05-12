/*
 login.dto.ts
*/
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
	@IsNotEmpty({ message: '请输入手机号' })
	@ApiProperty({ description: '手机号' })
	readonly phone: string;

	@IsNotEmpty({ message: '请输入密码' })
	@ApiProperty({ description: '密码' })
	readonly password: string;
}
  