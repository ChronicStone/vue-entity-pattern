import type { DynamicFilter } from '@chronicstone/vue-sweettools';

export function userFilter(params: { key: string; label?: string }): DynamicFilter {
  return {
    key: params.key,
    label: params?.label ?? 'User',
    type: 'select',
    options: getUserOptions,
    multiple: true,
    matchMode: 'equals',
    fieldParams: {
      renderLabel: renderUserSelectLabel,
      renderTag: renderUserSelectTag({ multiple: true }),
    },
  };
}
