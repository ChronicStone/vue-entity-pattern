<script setup lang="ts">
import { FormProvider } from '@chronicstone/vue-sweettools';
import '@chronicstone/vue-sweettools/dist/style.css';
import AppProvider from './appProvider.vue';
const appStore = useAppStore();

watch(
  () => appStore.isDark,
  (isDark) => {
    if (isDark) document?.querySelector('body')?.classList.add('dark', 'theme-dark');
    else document?.querySelector('body')?.classList.remove('dark', 'theme-dark');
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <NConfigProvider
      id="appRoot"
      class="demo"
      :theme="appStore.theme"
      :theme-overrides="appStore.themeOverrides"
    >
      <FormProvider>
        <NDialogProvider>
          <NMessageProvider>
            <NNotificationProvider>
              <NLoadingBarProvider>
                <AppProvider />
              </NLoadingBarProvider>
            </NNotificationProvider>
          </NMessageProvider>
        </NDialogProvider>
      </FormProvider>
    </NConfigProvider>
  </div>
</template>

<style>
body {
  --at-apply: '!font-satoshi';
}
</style>
