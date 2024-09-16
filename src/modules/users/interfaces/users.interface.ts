import { User } from '@prisma/client';

export interface IUserFinder {
  findByEmail(email: string): Promise<User>;
}

export interface IUserSavior {
  save(user: Omit<User, 'id'>): Promise<void>;
}
