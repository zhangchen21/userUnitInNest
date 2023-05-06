import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly user: User[] = [];

  create(user: User) {
    this.user.push(user);
  }


  getHello(): string {
    return 'Hello User!';
  }
}
