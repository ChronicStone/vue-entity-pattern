<script setup lang="ts">
import { DataGrid, DataTable } from '@chronicstone/vue-sweettools';
import { ApiClient } from '~/api';

const { $messageApi } = useNuxtApp();
const productId = defineProp<string>('productId', { required: true });

const { data, pending } = useAsyncState(() => ApiClient.products.one({ id: productId.value }), {
  watch: [productId],
  onError(error) {
    $messageApi.error(error instanceof Error ? error.message : 'Product not found');
    return navigateTo('/');
  },
});

const activeSection = ref<'orders'>('orders');
</script>

<template>
  <div class="flex flex-col gap-8">
    <NCard segmented>
      <template #header>
        <div class="flex flex-col">
          <h2 class="!m-0">PRODUCT DETAILS</h2>
          <span class="text-sm text-gray-500">ID: {{ productId }}</span>
        </div>
      </template>
      <DataGrid :data="data" v-bind="productProfileSchema()" />
    </NCard>

    <NCard content-class="!p-0">
      <NTabs
        size="large"
        animated
        :value="activeSection"
        :on-update:value="($event) => (activeSection = $event)"
        :content-style="{ padding: '0 50px' }"
        type="line"
      >
        <NTabPane name="orders">
          <template #tab>
            <span class="px-4 py-2 uppercase text-xl font-semibold flex items-center gap-1"> Orders </span>
          </template>

          <DataTable
            v-bind="orderTableSchema({ productId })"
            frameless
            header-class="px-4"
            footer-class="px-4 pb-4"
          >
            <div class="text-xl font-medium">Orders</div>
          </DataTable>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>
