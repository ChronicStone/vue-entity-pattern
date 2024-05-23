import { faker } from '@faker-js/faker';
import type { z } from 'zod';
import { userStatusDto, type createUserDto } from '../dto/user.dto';
import { USERS_STORE } from '../store';

export const UserController = {
  async list() {
    return await Promise.resolve(USERS_STORE);
  },
  async one(params: { id: string }) {
    const user = USERS_STORE.find((u) => u.id === params.id);
    if (!user) {
      throw new Error('User not found');
    }

    return await Promise.resolve(user);
  },
  async create(user: z.infer<typeof createUserDto>) {
    const _user = { ...user, id: faker.string.uuid(), status: userStatusDto.enum.Active };
    USERS_STORE.push(_user);
    return await Promise.resolve(_user);
  },
  async update(id: string, user: z.infer<typeof createUserDto>) {
    const userIndex = USERS_STORE.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const _user = { ...user, id, status: userStatusDto.enum.Active };
    USERS_STORE[userIndex] = _user;
    return await Promise.resolve(_user);
  },
  async destroy(id: string) {
    const userIndex = USERS_STORE.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    USERS_STORE.splice(userIndex, 1);
    return await Promise.resolve(true);
  },
};
