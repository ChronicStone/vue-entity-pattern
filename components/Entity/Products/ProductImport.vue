<script setup lang="ts">
import { ExcelReader, useExcelReader } from '@chronicstone/vue-sweettools';
import { ApiClient } from '~/api';

const { $messageApi } = useNuxtApp();
const readerRef = ref<InstanceType<typeof ExcelReader>>();
const { validRows, invalidRows, exportInvalidRows } = useExcelReader(readerRef, productImportSchema());

async function importProducts() {
  try {
    const products = await ApiClient.products.import(validRows.value);
    $messageApi.success(`${products.length} imported successfully`);
    return navigateTo({ name: 'index' });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) $messageApi.error(error.message);
  }
}
</script>

<template>
  <div>
    <NCard :segmented="{ content: true }">
      <template #header>
        <div>
          <h2 class="text-xl font-semibold uppercase">Import products</h2>
        </div>
      </template>

      <template #header-extra> </template>
      <ExcelReader ref="readerRef" title="Import products" v-bind="productImportSchema()">
        <template #actions>
          <NButton secondary type="error" :disabled="!invalidRows.length" @click="exportInvalidRows">
            <template #icon>
              <Icon name="mdi:export" />
            </template>
            EXPORT INVALID
          </NButton>

          <NButton secondary type="primary" :disabled="!validRows.length" @click="importProducts">
            <template #icon>
              <Icon name="mdi:import" />
            </template>
            IMPORT VALID
          </NButton>
        </template>
      </ExcelReader>
    </NCard>
  </div>
</template>
