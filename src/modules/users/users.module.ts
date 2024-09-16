import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { MongodbUser } from './interfaces/implementations/mongodb-user';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserFinder',
      useClass: MongodbUser,
    },
    {
      provide: 'IUserSavior',
      useClass: MongodbUser,
    },
    PrismaService,
  ],
})
export class UserModule {}
