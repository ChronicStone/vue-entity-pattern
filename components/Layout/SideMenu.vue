<script setup lang="tsx">
import type { MenuDividerOption, MenuOption, MenuGroupOption } from 'naive-ui';
import { Icon, NuxtLink } from '#components';
import type { NavigationItem } from '~/types/system/navigation';

function renderIcon(icon: string) {
  return () => <Icon name={icon} />;
}

function mapOptions(options: Array<NavigationItem>): MenuOption[] {
  return options.map((option) => ({
    label: () => <NuxtLink to={{ name: option.path }}>{option.label}</NuxtLink>,
    icon: renderIcon(option.icon),
    key: option.path,
  }));
}

const navOptions = computed(() => mapOptions(NAVIGATION_CONFIG));
</script>

<template>
  <n-menu :options="navOptions" :value="$route.name" />
</template>
