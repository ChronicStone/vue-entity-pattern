<script setup lang="tsx">
import { useFormApi } from '@chronicstone/vue-sweettools';
import { useThemeVars } from 'naive-ui';

const appStore = useAppStore();
const userStore = useUserStore();
const nuxtApp = useNuxtApp();

const formApi = useFormApi();
const dialogApi = useDialog();
const loadingBarApi = useLoadingBar();
const messageApi = useMessage();
const notificationApi = useNotification();
const themeVars = useThemeVars();

nuxtApp.provide('formApi', formApi);
nuxtApp.provide('dialogApi', dialogApi);
nuxtApp.provide('loadingBarApi', loadingBarApi);
nuxtApp.provide('messageApi', messageApi);
nuxtApp.provide('notificationApi', notificationApi);
nuxtApp.provide('themeVars', themeVars);
</script>

<template>
  <NSpin :show="appStore.isLoading">
    <template v-if="appStore.loadingMessage" #description>
      <span class="font-black text-primary">
        {{ appStore.loadingMessage }}
      </span>
    </template>
    <div>
      <NuxtLayout>
        <NuxtPage :key="`${userStore.activeEntity}-${userStore.activeUserId}`" />
      </NuxtLayout>
    </div>
  </NSpin>
</template>
