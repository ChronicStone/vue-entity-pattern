import { darkTheme, type GlobalTheme } from 'naive-ui';
import { useStorage as useVStorage } from '@vueuse/core';

export const useAppStore = defineStore('app', () => {
    const isLoading = ref<boolean>(true)
    const loadingMessage = ref<string>('')


    const isDark = useVStorage('app-theme', false, localStorage);
    const theme = computed<GlobalTheme | null>(() => (isDark.value ? darkTheme : null));
  
    function toggleTheme() {
        isDark.value = !isDark.value
    }

    function startLoading(message?: string) {
        isLoading.value = true
        if (message) loadingMessage.value = message
    }

    function stopLoading() {
        isLoading.value = false
        loadingMessage.value = ''
    }

    return {
        isDark,
        theme,
        isLoading,
        loadingMessage,
        startLoading,
        toggleTheme,
        stopLoading
    }
})