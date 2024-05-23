import { z } from 'zod';

export const userStatusDto = z.enum(['Active', 'Inactive']);

// Define user schema
export const userDto = z.object({
  id: z.string(),
  status: userStatusDto,
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  imageUrl: z.string(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string(),
    })
    .optional(),
});

export const createUserDto = userDto.omit({ id: true, status: true });

export const updateUserDto = createUserDto;
