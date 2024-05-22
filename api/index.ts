import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';

export const ApiClient = {
  products: ProductController,
  orders: OrderController,
};
