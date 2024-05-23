import { buildFormSchema, buildTableSchema, timeRangeFilter } from '@chronicstone/vue-sweettools';
import { ApiClient } from '~/api';

export function orderTableSchema(params?: { productId?: string }) {
  const userStore = useUserStore();
  return buildTableSchema({
    tableKey: 'orders',
    remote: false,
    searchQuery: ['product.name', 'product.category', 'product.tags'],
    staticFilters: [
      ...(params?.productId
        ? [{ key: 'productId', value: params.productId, matchMode: 'equals' as const }]
        : []),
      ...(userStore.activeEntity === 'user' && userStore.activeUserId
        ? [{ key: 'buyerId', value: userStore.activeUserId, matchMode: 'equals' as const }]
        : []),
    ],
    filters: [
      userFilter({ key: 'buyerId', label: 'Buyer' }),
      //   userFilter({ key: 'product.seller.id', label: 'Seller' }),
      timeRangeFilter({ key: 'createdAt', label: 'Created at' }),
    ],
    columns: [
      { key: 'id', label: 'ID', summary: [{ value: 'TOTAL' }] },
      { key: 'buyer.lastName', label: 'Buyer', render: (t) => renderUserTag(t.buyer), width: 250 },
      {
        key: 'product.name',
        label: 'Product',
        render: (t) => renderProductPopoverCard(t.product),
        width: 250,
      },
      {
        key: 'status',
        label: 'Status',
        render: (t) => renderOrderStatus(t.status),
        width: 150,
      },
      {
        key: 'statusDelivery',
        label: 'Delivery status',
        render: (t) => t.statusDelivery && renderOrderDeliveryStatus(t.statusDelivery),
        width: 150,
      },
      {
        key: 'amount',
        label: 'Amount',
        width: 150,
        summary: [{ value: (r) => r.reduce((acc, o) => acc + o.amount, 0) }],
      },
      {
        key: 'totalPrice',
        label: 'Total price',
        render: (t) => formatCurrency(t.totalPrice),
        width: 150,
        summary: [{ value: (r) => formatCurrency(r.reduce((acc, o) => acc + o.totalPrice, 0)) }],
      },
      { key: 'createdAt', label: 'Created at', width: 150 },
      { key: 'updatedAt', label: 'Updated at', width: 150 },
    ],
    datasource: ApiClient.orders.list,
    actions: [
      {
        label: 'Create order',
        icon: 'mdi:plus',
        action: ({ tableApi }) => createOrder(params).then((refresh) => refresh && tableApi.refreshData()),
      },
    ],
  });
}

export function orderFormSchema(params?: { productId?: string }) {
  return buildFormSchema({
    title: 'Create order',
    maxWidth: '600px',
    fields: [
      {
        key: 'buyerId',
        label: 'Buyer',
        type: 'select',
        options: getUserOptions,
        fieldParams: {
          renderLabel: renderUserSelectLabel,
          renderTag: renderUserSelectTag({ multiple: false }),
        },
      },
      {
        key: 'productId',
        label: 'Product',
        type: 'select',
        options: getProductOptions,
        conditionEffect: 'disable',
        condition: () => !params?.productId,
        default: params?.productId,
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'slider',
        dependencies: ['productId'],
        fieldParams: (deps, api) => {
          const options = api.getOptions<{ value: string; stock: string }>('productId');
          const product = options.find((p) => p.value === deps.productId);
          if (!product) return { min: 1, max: 10 };
          return { min: 1, max: product.stock, step: 1 };
        },
        condition: (deps) => !!deps.productId,
        conditionEffect: 'disable',
        size: 8,
      },
      {
        type: 'info',
        key: '',
        label: 'Total price',
        dependencies: ['amount', 'productId'],
        content: (deps, api) => {
          const options = api.getOptions<{ value: string; price: number }>('productId');
          const product = options.find((p) => p.value === deps.productId);
          if (!product) return formatCurrency(0);
          return formatCurrency(product.price * deps.amount);
        },
      },
    ],
  });
}
