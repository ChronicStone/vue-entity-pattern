<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <div class="h-screen w-screen">
    <n-layout position="absolute">
      <n-layout-header class="!h-[64px] p-4 flex items-center" bordered>
        <Header />
      </n-layout-header>
      <n-layout has-sider position="absolute" class="!top-[64px]">
        <n-layout-sider bordered content-class="p-0 h-full">
          <SideMenu />
        </n-layout-sider>
        <n-layout content-class="p-6">
          <div :key="`${userStore.activeEntity}-${userStore.activeUserId}`">
            <slot />
          </div>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>
