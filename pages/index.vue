<script setup lang="ts">
import { DataTable } from '@chronicstone/vue-sweettools';
</script>

<template>
  <DataTable v-bind="productTableSchema()" />
</template>
