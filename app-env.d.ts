import { useLoadingBar, useMessage, useDialog, useNotification, useThemeVars } from 'naive-ui';
import { useFormApi, useLocalizedValidators } from '@chronicstone/vue-sweettools';
import type { ComputedRef } from 'vue';

declare module '#vue-router' {
  interface RouteMeta {
    entities?: Array<'admin' | 'user'>;
  }
}

declare module '#app' {
  interface PageMeta {
    entities?: Array<'admin' | 'user'>;
  }

  interface NuxtApp {
    $formApi: ReturnType<typeof useFormApi>;
    $messageApi: ReturnType<typeof useMessage>;
    $loadingBarApi: ReturnType<typeof useLoadingBar>;
    $dialogApi: ReturnType<typeof useDialog>;
    $notificationApi: ReturnType<typeof useNotification>;
    $themeVars: ReturnType<typeof useThemeVars>;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $$SomeHahaProp: string
    $formApi: ReturnType<typeof useFormApi>;
    $messageApi: ReturnType<typeof useMessage>;
    $loadingBarApi: ReturnType<typeof useLoadingBar>;
    $dialogApi: ReturnType<typeof useDialog>;
    $notificationApi: ReturnType<typeof useNotification>;
    $themeVars: ReturnType<typeof useThemeVars>;
  }
}



export {};

