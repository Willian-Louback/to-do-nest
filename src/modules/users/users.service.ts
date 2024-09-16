import { Inject, Injectable } from '@nestjs/common';
import { IUserFinder, IUserSavior } from './interfaces/users.interface';
import { ICreateUserDTO } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserFinder') private userFinder: IUserFinder,
    @Inject('IUserSavior') private userSavior: IUserSavior,
  ) {}

  async createUser(data: ICreateUserDTO): Promise<{ message: string }> {
    await this.verifyUserDoesNotExist(data.email);

    await this.saveUser(data);

    return { message: 'Usuário criado' };
  }

  private async verifyUserDoesNotExist(email: string): Promise<void> {
    const userAlreadyExistis = await this.userFinder.findByEmail(email);
    if (userAlreadyExistis) throw new Error('User already existis.');
  }

  private async saveUser(data: ICreateUserDTO): Promise<void> {
    const user: Omit<User, 'id'> = data;
    await this.userSavior.save(user);
  }
}
