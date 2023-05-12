import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '用户手机号' })
  phone: string;

  @ApiProperty({ description: '用户地域' })
  area: string;
}
