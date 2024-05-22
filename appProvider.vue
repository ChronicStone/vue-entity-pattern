<script setup lang="tsx">
import { useLocalizedValidators, useFormApi } from '@chronicstone/vue-sweettools';
import { useThemeVars, NButton } from 'naive-ui';

const route = useRoute();
const appStore = useAppStore();
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
        <NuxtPage />
      </NuxtLayout>
    </div>
  </NSpin>
</template>
