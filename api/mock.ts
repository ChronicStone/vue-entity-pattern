import { faker } from '@faker-js/faker';
import type { z } from 'zod';
import { productStatusDto, productCategoryDto, productDto } from './dto/product.dto';
import { userStatusDto, type userDto } from './dto/user.dto';
import { orderStatusDto, deliveryStatusDto, orderDto } from './dto/order.dto';

export function generateProducts(
  count: number,
  sellers: z.infer<typeof userDto>[],
): z.infer<typeof productDto>[] {
  const products = [];

  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    const name = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const status = productStatusDto.options[Math.floor(Math.random() * productStatusDto.options.length)];
    const category =
      productCategoryDto.options[Math.floor(Math.random() * productCategoryDto.options.length)];
    const price = parseFloat(faker.commerce.price({ min: 10, max: 500 }));
    const images = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => faker.image.url());
    const stock = faker.number.int({ min: 0, max: 100 });
    const tags = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
      faker.commerce.productAdjective(),
    );
    const seller = sellers[Math.floor(Math.random() * sellers.length)];

    const product = {
      id,
      name,
      description,
      status,
      category,
      price,
      images,
      stock,
      tags,
      sellerId: seller.id,
      seller,
    };

    products.push(product);
  }

  return products;
}

export function generateUsers(count: number): z.infer<typeof userDto>[] {
  const users = [];

  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const phoneNumber = faker.phone.number();
    const address = {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
    };

    const user = {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      imageUrl: faker.image.avatar(),
      status: userStatusDto.options[Math.floor(Math.random() * userStatusDto.options.length)],
    };

    users.push(user);
  }

  return users;
}

// Function to generate random orders
export function generateOrders(
  count: number,
  buyers: z.infer<typeof userDto>[],
  products: z.infer<typeof productDto>[],
): z.infer<typeof orderDto>[] {
  const orders = [];

  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const amount = faker.number.int({ min: 1, max: 10 });
    const totalPrice = product.price * amount;
    const status = orderStatusDto.options[Math.floor(Math.random() * orderStatusDto.options.length)];
    const statusDelivery =
      status === 'In delivery'
        ? deliveryStatusDto.options[Math.floor(Math.random() * deliveryStatusDto.options.length)]
        : status === 'Completed'
        ? deliveryStatusDto.enum.Delivered
        : undefined;
    const createdAt = faker.date.past().toISOString();
    const updatedAt = faker.date.recent().toISOString();

    const order = {
      id,
      buyer,
      buyerId: buyer.id,
      productId: product.id,
      product,
      amount,
      totalPrice,
      status,
      statusDelivery,
      createdAt,
      updatedAt,
    };

    orders.push(order);
  }

  return orders;
}
