import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
	@ApiProperty({ description: '用户账号' })
	readonly username?: string;

	@ApiProperty({ description: '用户地域' })
	readonly area?: string;
}
