import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
@Entity('user')
export class UserEntity {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService
  ) {}

  @ApiProperty({ description: '用户id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  area: string;

  @BeforeInsert() 
  async encryptPwd() { 
    if (!this.password) return;
    this.password = await bcrypt.hashSync(
      this.password, 
      // TODO 
      /*this.configService.get('SECRET', 'test123456')*/ 10
    ); 
  } 
}
