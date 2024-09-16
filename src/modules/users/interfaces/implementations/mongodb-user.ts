import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IUserFinder, IUserSavior } from '../users.interface';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MongodbUser implements IUserSavior, IUserFinder {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async save(user: Omit<User, 'id'>): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          ...user,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
