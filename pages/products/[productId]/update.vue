<script setup lang="ts">
const route = useRoute('products-productId-update');
</script>

<template>
  <ProductForm :product-id="route.params.productId" />
</template>
