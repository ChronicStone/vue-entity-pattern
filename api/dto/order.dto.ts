import { z } from 'zod';
import { productDto } from './product.dto';
import { userDto } from './user.dto';

export const orderStatusDto = z.enum(['Pending', 'Completed', 'Cancelled', 'In delivery']);
export const deliveryStatusDto = z.enum(['Preparing', 'Shipped', 'Out for delivery', 'Delivered']);

// Define order schema
export const orderDto = z.object({
  id: z.string(),
  buyerId: z.string(),
  buyer: userDto,
  productId: z.string(),
  product: productDto,
  amount: z.number().int().min(1),
  totalPrice: z.number().positive(),
  status: orderStatusDto,
  statusDelivery: deliveryStatusDto.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const createOrderDto = orderDto.omit({
  id: true,
  status: true,
  statusDelivery: true,
  buyer: true,
  product: true,
  totalPrice: true,
  createdAt: true,
  updatedAt: true,
});
