import { buildFormSchema, buildGridSchema, buildTableSchema } from '@chronicstone/vue-sweettools';
import { ApiClient } from '~/api';
import { productStatusDto } from '~/api/dto/product.dto';

export function productTableSchema() {
  return buildTableSchema({
    tableKey: '',
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
  return buildGridSchema({
    fields: [],
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
