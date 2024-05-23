import { darkTheme, type GlobalTheme, type GlobalThemeOverrides } from 'naive-ui';
import { useStorage as useVStorage } from '@vueuse/core';

export const useAppStore = defineStore('app', () => {
  const isLoading = ref<boolean>(false);
  const loadingMessage = ref<string>('');

  const isDark = useVStorage('app-theme', false, localStorage);
  const theme = computed<GlobalTheme | null>(() => (isDark.value ? darkTheme : null));
  const themeOverrides = computed<GlobalThemeOverrides>(() =>
    isDark.value ? DarkThemeOverrides : LightThemeOverrides,
  );

  function toggleTheme() {
    isDark.value = !isDark.value;
  }

  function startLoading(message?: string) {
    isLoading.value = true;
    if (message) loadingMessage.value = message;
  }

  function stopLoading() {
    isLoading.value = false;
    loadingMessage.value = '';
  }

  return {
    isDark,
    theme,
    isLoading,
    loadingMessage,
    themeOverrides,
    startLoading,
    toggleTheme,
    stopLoading,
  };
});
