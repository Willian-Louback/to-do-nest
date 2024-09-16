import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { ICreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() data: ICreateUserDTO): Promise<{ message: string }> {
    return this.userService.createUser(data);
  }
}
