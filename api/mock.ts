import { faker } from '@faker-js/faker';
import type { z } from 'zod';
import {
  productStatusDto,
  productCategoryDto,
  productMaterialDto,
  productSizeDto,
  productColorDto,
  productDto,
} from './dto/product.dto';

export function generateProducts(count: number): z.infer<typeof productDto>[] {
  const products = [];

  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    const name = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const status = productStatusDto.options[Math.floor(Math.random() * productStatusDto.options.length)];
    const category =
      productCategoryDto.options[Math.floor(Math.random() * productCategoryDto.options.length)];
    const price = parseFloat(faker.commerce.price(10, 500));
    const materials = Array.from(
      { length: Math.floor(Math.random() * productMaterialDto.options.length) + 1 },
      () => productMaterialDto.options[Math.floor(Math.random() * productMaterialDto.options.length)],
    );
    const images = Array.from({ length: 3 }, () => faker.image.imageUrl());
    const stock = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
      size: productSizeDto.options[Math.floor(Math.random() * productSizeDto.options.length)],
      color: productColorDto.options[Math.floor(Math.random() * productColorDto.options.length)],
      quantity: faker.datatype.number({ min: 0, max: 100 }),
      sku: faker.string.uuid(),
    }));
    const dimensions = {
      weight: parseFloat(faker.datatype.number({ min: 0.1, max: 5, precision: 0.01 }).toFixed(2)),
      length: parseFloat(faker.datatype.number({ min: 10, max: 100, precision: 0.01 }).toFixed(2)),
      width: parseFloat(faker.datatype.number({ min: 10, max: 100, precision: 0.01 }).toFixed(2)),
      height: parseFloat(faker.datatype.number({ min: 1, max: 50, precision: 0.01 }).toFixed(2)),
    };
    const tags = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
      faker.commerce.productAdjective(),
    );

    const product = {
      id,
      name,
      description,
      status,
      category,
      price,
      materials,
      images,
      stock,
      dimensions,
      tags,
    };

    products.push(product);
  }

  return products;
}
