<script setup lang="ts">
import { DataTable } from '@chronicstone/vue-sweettools';

definePageMeta({
  entities: ['admin'],
});
</script>

<template>
  <div>
    <DataTable v-bind="userTableSchema()"> Users </DataTable>
  </div>
</template>
