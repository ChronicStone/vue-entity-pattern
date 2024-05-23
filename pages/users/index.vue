<script setup lang="ts">
import { DataTable } from '@chronicstone/vue-sweettools';
</script>

<template>
  <div>
    <DataTable v-bind="userTableSchema()"> Users </DataTable>
  </div>
</template>
