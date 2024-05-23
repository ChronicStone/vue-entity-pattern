import { ApiClient } from '~/api';

export function getProductOptions() {
  return ApiClient.products.list().then((products) =>
    products.map((product) => ({
      label: product.name,
      value: product.id,
      stock: product.stock,
      price: product.price,
    })),
  );
}
