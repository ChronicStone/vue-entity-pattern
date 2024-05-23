import { buildFormSchema, buildGridSchema, buildTableSchema } from '@chronicstone/vue-sweettools';
import { ApiClient } from '~/api';
import { productStatusDto } from '~/api/dto/product.dto';
import type { Product } from '~/types/entities/product';

export function productTableSchema() {
  return buildTableSchema({
    tableKey: 'products',
    remote: false,
    searchQuery: ['name', 'description'],
    filters: [productStatusFilter({ key: 'status' }), userFilter({ key: 'sellerId', label: 'Seller' })],
    columns: [
      { key: 'seller.lastName', label: 'Seller', render: (t) => renderUserTag(t.seller), width: 250 },
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status', render: (t) => renderProductStatus(t.status), width: 100 },
      { key: 'description', label: 'Description', ellipsis: true },
      { key: 'category', label: 'Category', width: 150 },
      { key: 'price', label: 'Price', render: (t) => formatCurrency(t.price), width: 100 },
      { key: 'stock', label: 'Stock', render: (t) => `${t.stock} units`, width: 100 },
      { key: 'tags', label: 'Tags', render: (t) => renderProductTags(t.tags ?? [], 2), width: 250 },
      { key: 'id', label: 'ID' },
    ],
    datasource: ApiClient.products.list,
    rowActions: [
      {
        label: 'Open details',
        icon: 'mdi:eye',
        link: ({ rowData }) => appLink({ name: 'products-productId', params: { productId: rowData.id } }),
      },
      {
        label: 'Update status',
        icon: 'mdi:update',
        action: ({ rowData, tableApi }) =>
          updateProductStatus(rowData).then((refresh) => refresh && tableApi.refreshData()),
      },
      {
        label: 'Delete',
        icon: 'mdi:trash',
        action: ({ rowData, tableApi }) =>
          deleteProduct(rowData).then((refresh) => refresh && tableApi.refreshData()),
        condition: ({ rowData }) => rowData.status === 'Disabled' || rowData.status === 'Draft',
      },
    ],
  });
}

export function productFormSchema() {
  return buildFormSchema({
    fields: [],
  });
}

export function productProfileSchema() {
  return buildGridSchema<Product>({
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status', render: ({ data }) => renderProductStatus(data.status) },
      { key: 'tags', label: 'Tags', render: ({ data }) => renderProductTags(data.tags ?? [], 2) },
      { key: 'category', label: 'Category' },
      { key: 'price', label: 'Price', render: ({ data }) => formatCurrency(data.price) },
      { key: 'stock', label: 'Stock', render: ({ data }) => `${data.stock} units` },
      {
        key: 'description',
        label: 'Description',
        ellipsis: true,
        render: ({ data }) => renderTextEllipsis(data.description, { lineClamp: 2 }),
        fitWidth: false,
      },
    ],
  });
}

export function productStatusFormSchema() {
  return buildFormSchema({
    title: 'Update product status',
    maxWidth: '500px',
    fields: [
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: Object.values(productStatusDto.enum),
        size: 8,
      },
    ],
  });
}
