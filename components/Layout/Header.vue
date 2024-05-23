<script setup lang="ts">
const appStore = useAppStore();
</script>

<template>
  <div class="flex items-center w-full h-full justify-between">
    <div>
      <NH2 class="!m-0 uppercase">Entity repo demo</NH2>
    </div>

    <div>
      <NSwitch v-model:value="appStore.isDark">
        <template #icon>
          <Icon :name="appStore.isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'" />
        </template>
      </NSwitch>
    </div>
  </div>
</template>
