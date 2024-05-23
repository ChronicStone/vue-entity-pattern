import type { z } from 'zod';
import { faker } from '@faker-js/faker';
import { ORDERS_STORE, PRODUCTS_STORE, USERS_STORE } from '../store';
import type { createProductDto } from '../dto/product.dto';
import type { createOrderDto, orderDto } from '../dto/order.dto';

export const OrderController = {
  async list() {
    return await Promise.resolve(ORDERS_STORE);
  },
  async one(params: { id: string }) {
    const order = ORDERS_STORE.find((o) => o.id === params.id);
    if (!order) {
      throw new Error('Order not found');
    }

    return await Promise.resolve(order);
  },
  async create(order: z.infer<typeof createOrderDto>) {
    const product = PRODUCTS_STORE.find((p) => p.id === order.productId);
    const buyer = USERS_STORE.find((o) => o.id === order.buyerId);
    if (!product) throw new Error('Product not found');
    if (!buyer) throw new Error('Buyer not found');

    const _order = {
      ...order,
      id: faker.string.uuid(),
      product,
      buyer,
      status: 'Pending',
      statusDelivery: 'Preparing',
      totalPrice: product.price * order.amount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } satisfies z.infer<typeof orderDto>;
    ORDERS_STORE.push(_order);
    return await Promise.resolve(_order);
  },
};
