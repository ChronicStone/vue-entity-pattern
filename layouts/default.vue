<template>
  <div class="h-screen w-screen">
    <n-layout position="absolute">
      <n-layout-header class="!h-[64px] p-4 flex items-center" bordered>
        <Header />
      </n-layout-header>
      <n-layout has-sider position="absolute" class="!top-[64px]">
        <n-layout-sider bordered content-class="p-0">
          <SideMenu />
        </n-layout-sider>
        <n-layout content-class="p-6">
          <div><slot /></div>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>
