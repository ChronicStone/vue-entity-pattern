<script setup lang="ts">
import { FormRenderer, type FormRefInstance, useFormController } from '@chronicstone/vue-sweettools';
import { ApiClient } from '~/api';

const { $messageApi } = useNuxtApp();
const productId = defineProp<string>('productId', { required: false });

const { data, pending } = useAsyncState(
  async () => (!productId.value ? null : await ApiClient.products.one({ id: productId.value })),
  {
    watch: [productId],
    onError(error) {
      $messageApi.error(error instanceof Error ? error.message : 'Unexpected error');
      return navigateTo({ name: 'index' });
    },
  },
);

const formRef = ref<FormRefInstance>();
const { formData, validate } = useFormController(formRef, productFormSchema());

async function handleSubmit() {
  if (!(await validate())) return;
  if (productId.value) createProduct();
  else updateProduct();
}

async function createProduct() {
  try {
    const createdProduct = await ApiClient.products.create(formData.value);
    $messageApi.success('Product created');
    navigateTo({ name: 'products-productId', params: { productId: createdProduct.id } });
  } catch (error) {
    console.error(error);
    $messageApi.error(error instanceof Error ? error.message : 'Unexpected error');
  }
}

async function updateProduct() {
  if (!productId.value) return;
  try {
    const updatedProduct = await ApiClient.products.update(productId.value, formData.value);
    $messageApi.success('Product updated');
    navigateTo({ name: 'products-productId', params: { productId: updatedProduct.id } });
  } catch (error) {
    console.error(error);
    $messageApi.error(error instanceof Error ? error.message : 'Unexpected error');
  }
}
</script>

<template>
  <NCard segmented>
    <template #header>
      <div class="flex items-center gap-2 text-lg font-semibold uppercase">
        <Icon :name="productId ? 'mdi:pen' : 'mdi:plus'" />
        <span> {{ productId ? 'Create' : 'Update' }} account </span>
      </div>
    </template>
    <div v-if="pending">
      <div class="w-full h-32 grid place-items- enter">
        <NSpin />
      </div>
    </div>
    <template v-else>
      <FormRenderer ref="formRef" :schema="productFormSchema()" :data="data ?? {}" />
      <FormActions
        :mode="productId ? 'update' : 'create'"
        @submit="handleSubmit"
        @cancel="productId ? navigateTo(`/products/${productId}`) : navigateTo('/products')"
      />
    </template>
  </NCard>
</template>
