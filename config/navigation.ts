import type { NavigationItem } from '~/types/system/navigation';
export const NAVIGATION_CONFIG: Array<NavigationItem> = [
  {
    path: 'index',
    label: 'Products',
    icon: 'icon-park-outline:ad-product',
  },
  {
    path: 'orders',
    label: 'Orders',
    icon: 'material-symbols:inactive-order',
  },
  {
    path: 'users',
    label: 'Users',
    icon: 'ph:users-three-fill',
    entities: ['admin'],
  },
];
