<script setup lang="ts">
const route = useRoute('products-productId');
</script>

<template>
  <ProductProfile :product-id="route.params.productId" />
</template>
