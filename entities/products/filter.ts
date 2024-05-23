import type { DynamicFilter } from '@chronicstone/vue-sweettools';
import { productStatusDto } from '~/api/dto/product.dto';

export function productStatusFilter(params: { key: string }): DynamicFilter {
  return {
    key: params.key,
    label: 'Status',
    type: 'select',
    options: Object.values(productStatusDto.enum),
    multiple: true,
    matchMode: 'equals',
  };
}
