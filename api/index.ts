import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { UserController } from './controllers/user.controller';

export const ApiClient = {
  products: ProductController,
  orders: OrderController,
  users: UserController,
};
