import type { z } from 'zod';
import { faker } from '@faker-js/faker';
import { PRODUCTS_STORE } from '../store';
import type { createProductDto } from '../dto/product.dto';

export const OrderController = {
  list() {
    return PRODUCTS_STORE;
  },
  one(params: { id: string }) {
    return PRODUCTS_STORE.find((product) => product.id === params.id);
  },
  create(product: z.infer<typeof createProductDto>) {
    PRODUCTS_STORE.push({
      ...product,
      id: faker.string.uuid(),
    });
  },
  update(productId: string, product: z.infer<typeof createProductDto>) {
    const productIndex = PRODUCTS_STORE.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    PRODUCTS_STORE[productIndex] = {
      ...product,
      id: productId,
    };
  },
};
