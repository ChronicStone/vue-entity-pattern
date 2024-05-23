import { ExcelSchemaBuilder } from '@chronicstone/typed-xlsx';
import {
  buildExcelSchema,
  buildFormSchema,
  buildGridSchema,
  buildTableSchema,
} from '@chronicstone/vue-sweettools';
import { faker } from '@faker-js/faker';
import { ApiClient } from '~/api';
import { productCategoryDto, productStatusDto } from '~/api/dto/product.dto';
import type { Product } from '~/types/entities/product';

export function productTableSchema() {
  const userStore = useUserStore();
  return buildTableSchema({
    tableKey: 'products',
    remote: false,
    searchQuery: ['name', 'description'],
    staticFilters:
      userStore.activeEntity === 'user'
        ? [{ key: 'sellerId', value: userStore.activeUserId, matchMode: 'equals' }]
        : [],
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
    actions: [
      {
        label: 'Create product',
        icon: 'mdi:plus',
        action: () => navigateTo({ name: 'products-create' }),
      },
      {
        label: 'Import bulk products',
        icon: 'mdi:import',
        action: () => navigateTo({ name: 'products-import' }),
      },
      {
        label: 'Export products',
        icon: 'mdi:export',
        action: ({ selected }) => exportProducts(selected),
      },
    ],
    rowActions: [
      {
        label: 'Open details',
        icon: 'mdi:eye',
        link: ({ rowData }) => appLink({ name: 'products-productId', params: { productId: rowData.id } }),
      },
      {
        label: 'Update product',
        icon: 'mdi:pen',
        link: ({ rowData }) =>
          appLink({ name: 'products-productId-update', params: { productId: rowData.id } }),
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
    fields: [
      { key: 'name', type: 'text', label: 'Name', required: true },
      {
        key: 'category',
        type: 'select',
        label: 'Category',
        required: true,
        options: Object.values(productCategoryDto.enum),
      },
      { key: 'description', type: 'textarea', label: 'Description', required: false, size: 8 },
      { key: 'price', type: 'number', label: 'Price', required: true, fieldParams: { prefix: '$' } },
      { key: 'stock', type: 'number', label: 'Stock', required: true, fieldParams: { min: 0, step: 1 } },
      {
        key: 'sellerId',
        type: 'select',
        label: 'Seller',
        required: true,
        options: getUserOptions,
        fieldParams: {
          renderTag: renderUserSelectTag({ multiple: false }),
          renderLabel: renderUserSelectLabel,
        },
      },
      // { key: 'images', type: 'file', label: 'Images', required: true, multiple: true },
      { key: 'tags', type: 'tag', label: 'Tags', required: false },
      {
        key: 'images',
        type: 'upload',
        label: 'Images',
        required: true,
        multiple: true,
        output: 'url',
        fieldParams: {
          listType: 'image-card',
        },
        uploadHandler: (opts) => {
          opts.file.url = faker.image.url();
          opts.file.percentage = 100;
          opts.file.status = 'finished';
          opts.onFinish();
        },
        size: 8,
      },
    ],
  });
}

export function productImportSchema() {
  return buildExcelSchema({
    fields: [
      {
        key: 'name',
        label: 'Name',
        required: true,
        format: ['trim'],
        example: 'Blue shirt',
      },
      {
        key: 'category',
        label: 'Category',
        required: true,
        enum: Object.values(productCategoryDto.enum),
        example: productCategoryDto.enum.Clothing,
      },
      {
        key: 'description',
        label: 'Description',
        required: false,
        example: 'Blue shirt for men, with a white collar and a blue button-up.',
      },
      {
        key: 'price',
        label: 'Price',
        required: true,
        format: ['trim', 'number'],
        example: '100',
      },
      {
        key: 'stock',
        label: 'Stock',
        required: true,
        format: ['trim', 'number'],
        example: '10',
      },
      {
        key: 'sellerId',
        label: 'Seller',
        required: true,
        enum: async () => (await getUserOptions().then((users) => users.map((i) => i.value))) as string[],
        example: '2dq233d-23d-23d-23d-23d232323',
      },
      {
        key: 'images',
        label: 'Images',
        required: true,
        multiple: true,
        example: 'https://picsum.photos/200/300,https://picsum.photos/200/300',
      },
      {
        key: 'tags',
        label: 'Tags',
        required: false,
        multiple: true,
        example: 'blue,shirt,summer',
      },
    ],
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

export function productExcelExportSchema() {
  return ExcelSchemaBuilder.create<Product>()
    .withFormatters({
      currency: (currency: string) => `${currency}#,##0.00`,
    })
    .column('name', { key: 'name', label: 'Name' })
    .column('status', { key: 'status', label: 'Status' })
    .column('category', { key: 'category', label: 'Category' })
    .column('price', {
      key: 'price',
      label: 'Price',
      format: { preset: 'currency', params: '$' },
    })
    .column('stock', { key: 'stock', label: 'Stock' })
    .column('description', { key: 'description', label: 'Description' })
    .column('images', { key: 'images', label: 'Images' })
    .column('tags', { key: 'tags', label: 'Tags', transform: (t) => t?.join(', ') ?? '' })
    .build();
}
