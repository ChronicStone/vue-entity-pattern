import { generateOrders, generateProducts, generateUsers } from './mock';

export const USERS_STORE = generateUsers(20);
export const PRODUCTS_STORE = generateProducts(200, USERS_STORE);
export const ORDERS_STORE = generateOrders(1200, USERS_STORE, PRODUCTS_STORE);
