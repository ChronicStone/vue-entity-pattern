<script setup lang="ts">
import { DataTable } from '@chronicstone/vue-sweettools';
</script>

<template>
  <div>
    <DataTable v-bind="productTableSchema()"> Products </DataTable>
  </div>
</template>
