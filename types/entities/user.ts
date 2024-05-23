import type { z } from 'zod';
import type { userDto, userStatusDto } from '~/api/dto/user.dto';

export type User = z.infer<typeof userDto>;
export type UserStatus = z.infer<typeof userStatusDto>;
