<script setup lang="tsx">
import type { MenuDividerOption, MenuOption, MenuGroupOption } from 'naive-ui';
import { Icon, NuxtLink } from '#components';
import type { NavigationItem } from '~/types/system/navigation';

const userStore = useUserStore();

function renderIcon(icon: string) {
  return () => <Icon name={icon} />;
}

function mapOptions(options: Array<NavigationItem>): MenuOption[] {
  return options
    .map((option) => ({
      label: () => <NuxtLink to={{ name: option.path }}>{option.label}</NuxtLink>,
      icon: renderIcon(option.icon),
      key: option.path,
      entities: option.entities,
    }))
    .filter((option) => {
      if (!option.entities) return true;
      return isEntity(option.entities);
    });
}

const navOptions = computed(() => mapOptions(NAVIGATION_CONFIG));
</script>

<template>
  <div class="h-full flex flex-col">
    <n-menu :options="navOptions" :value="$route.name" />

    <div class="mt-auto p-2 flex flex-col gap-2">
      <NSelect
        v-model:value="userStore.activeEntity"
        :options="[
          { label: 'User', value: 'user' },
          { label: 'Admin', value: 'admin' },
        ]"
      />

      <NSelect
        v-if="userStore.activeEntity === 'user'"
        v-model:value="userStore.activeUserId"
        :options="userStore.users || []"
        :render-label="renderUserSelectLabel"
        :render-tag="renderUserSelectTag({ multiple: false })"
      />
    </div>
  </div>
</template>
