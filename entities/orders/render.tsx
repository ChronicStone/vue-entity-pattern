import { match } from 'ts-pattern';
import { NTag } from 'naive-ui';
import type { OrderDeliveryStatus, OrderStatus } from '~/types/entities/order';

export function renderOrderStatus(status: OrderStatus) {
  return match(status)
    .with('Pending', () => <NTag type="info">Pending</NTag>)
    .with('Completed', () => <NTag type="success">Completed</NTag>)
    .with('Cancelled', () => <NTag type="error">Cancelled</NTag>)
    .with('In delivery', () => <NTag type="warning">In delivery</NTag>)
    .exhaustive();
}

export function renderOrderDeliveryStatus(status: OrderDeliveryStatus) {
  return match(status)
    .with('Preparing', () => <NTag>Preparing</NTag>)
    .with('Shipped', () => <NTag type="info">Shipped</NTag>)
    .with('Out for delivery', () => <NTag type="warning">Out for delivery</NTag>)
    .with('Delivered', () => <NTag type="success">Delivered</NTag>)
    .exhaustive();
}
