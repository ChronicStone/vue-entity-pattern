import { z } from 'zod';

export const productStatusDto = z.enum(['Draft', 'Active', 'Disabled']);
export const productCategoryDto = z.enum(['Men', 'Women', 'Kids', 'Unisex']);
export const productSizeDto = z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
export const productColorDto = z.enum([
  'Red',
  'Blue',
  'Green',
  'Black',
  'White',
  'Yellow',
  'Pink',
  'Orange',
  'Purple',
  'Brown',
]);
export const productMaterialDto = z.enum(['Cotton', 'Polyester', 'Wool', 'Silk', 'Linen', 'Leather']);

// Define stock schema
export const productStockDto = z.object({
  size: productSizeDto,
  color: productColorDto,
  quantity: z.number().int().min(0),
  sku: z.string(),
});

// Define product schema
export const productDto = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: productStatusDto,
  category: productCategoryDto,
  price: z.number().positive(),
  materials: z.array(productMaterialDto),
  images: z.array(z.string().url()),
  stock: z.array(productStockDto),
  dimensions: z
    .object({
      weight: z.number().positive().optional(),
      length: z.number().positive().optional(),
      width: z.number().positive().optional(),
      height: z.number().positive().optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
});

export const createProductDto = productDto.omit({
  id: true,
});

export const updateProductDto = createProductDto.extend({});
