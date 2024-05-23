import type { RouteLocationNormalized } from '#vue-router';

export type NavigationItem = {
  label: string;
  icon: string;
  path: RouteLocationNormalized['name'];
  condition?: () => boolean;
};
