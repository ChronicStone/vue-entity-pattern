import type { z } from 'zod';
import { faker } from '@faker-js/faker';
import { PRODUCTS_STORE, USERS_STORE } from '../store';
import {
  importProductsDto,
  productStatusDto,
  updateProductDto,
  type createProductDto,
} from '../dto/product.dto';

export const ProductController = {
  async list() {
    return await Promise.resolve(PRODUCTS_STORE);
  },
  async one(params: { id: string }) {
    const product = PRODUCTS_STORE.find((p) => p.id === params.id);
    if (!product) {
      throw new Error(`Product ${params.id} not found`);
    }

    return await Promise.resolve(product);
  },
  async create(product: z.infer<typeof createProductDto>) {
    const seller = USERS_STORE.find((u) => u.id === product.sellerId);
    if (!seller) throw new Error(`Seller ${product.sellerId} not found`);

    const _product = { ...product, id: faker.string.uuid(), seller, status: productStatusDto.enum.Active };
    PRODUCTS_STORE.push(_product);
    return await Promise.resolve(_product);
  },
  async import(products: z.infer<typeof importProductsDto>) {
    const createdProducts = await Promise.all(
      products.map(async (product) => await ProductController.create(product)),
    );

    return await Promise.resolve(createdProducts);
  },
  async update(productId: string, product: Partial<z.infer<typeof updateProductDto>>) {
    const productIndex = PRODUCTS_STORE.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    PRODUCTS_STORE[productIndex] = {
      ...PRODUCTS_STORE[productIndex],
      ...product,
      id: productId,
    };

    return await Promise.resolve(PRODUCTS_STORE[productIndex]!);
  },

  async destroy(productId: string) {
    const productIndex = PRODUCTS_STORE.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    PRODUCTS_STORE.splice(productIndex, 1);
    return await Promise.resolve(true);
  },
};
