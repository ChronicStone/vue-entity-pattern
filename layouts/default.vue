<script setup lang="ts">
const siderCollapsed = ref<boolean>(false);
const isSmallScreen = useIsSmallScreen();

watch(
  () => isSmallScreen.value,
  (value) => value && (siderCollapsed.value = true),
  { immediate: true },
);
</script>

<template>
  <div class="h-screen w-screen">
    <n-layout position="absolute">
      <n-layout-header class="!h-[64px] p-4 flex items-center" bordered>
        <Header />
      </n-layout-header>
      <n-layout has-sider position="absolute" class="!top-[64px]">
        <n-layout-sider
          :collapsed="siderCollapsed"
          bordered
          content-class="p-0 h-full"
          show-trigger="bar"
          collapse-mode="width"
          :collapsed-width="isSmallScreen ? 0 : 64"
          :width="240"
          :on-update:collapsed="(collapsed) => (siderCollapsed = collapsed)"
        >
          <SideMenu v-model:collapsed="siderCollapsed" />
        </n-layout-sider>
        <n-layout content-class="p-6">
          <div>
            <slot />
          </div>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>
