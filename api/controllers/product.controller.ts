import type { z } from 'zod';
import { faker } from '@faker-js/faker';
import { PRODUCTS_STORE } from '../store';
import type { createProductDto } from '../dto/product.dto';

export const ProductController = {
  async list() {
    return await Promise.resolve(PRODUCTS_STORE);
  },
  async one(params: { id: string }) {
    return await Promise.resolve(PRODUCTS_STORE.find((p) => p.id === params.id));
  },
  async create(product: z.infer<typeof createProductDto>) {
    const _product = { ...product, id: faker.string.uuid() };
    PRODUCTS_STORE.push(_product);
    return await Promise.resolve(_product);
  },
  async update(productId: string, product: z.infer<typeof createProductDto>) {
    const productIndex = PRODUCTS_STORE.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    PRODUCTS_STORE[productIndex] = {
      ...product,
      id: productId,
    };

    return await Promise.resolve(PRODUCTS_STORE[productIndex]);
  },
};
