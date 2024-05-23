import { z } from 'zod';
import { userDto } from './user.dto';

export const productStatusDto = z.enum(['Draft', 'Active', 'Disabled']);
export const productCategoryDto = z.enum([
  'Clothing',
  'Accessories',
  'Footwear',
  'Electronics',
  'Home',
  'Beauty',
  'Food',
  'Gifts',
]);

// Define product schema
export const productDto = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: productStatusDto,
  category: productCategoryDto,
  price: z.number().positive(),
  images: z.array(z.string().url()),
  stock: z.number().int().min(0),
  tags: z.array(z.string()).optional(),
  sellerId: z.string(),
  seller: userDto,
});

export const createProductDto = productDto.omit({
  id: true,
  status: true,
  seller: true,
});

export const importProductsDto = z.array(createProductDto);

export const updateProductDto = productDto.omit({
  id: true,
  seller: true,
});
