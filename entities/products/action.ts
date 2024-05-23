import { ApiClient } from '~/api';
import type { Product } from '~/types/entities/product';

export async function updateProductStatus(product: Product) {
  const appStore = useAppStore();
  const { $messageApi, $formApi } = useNuxtApp();
  try {
    const { formData, isCompleted } = await $formApi.createForm(productStatusFormSchema(), {
      status: product.status,
    });
    if (!isCompleted) return;

    appStore.startLoading();
    const updated = await ApiClient.products.update(product.id, { status: formData.status });
    $messageApi.success('Product status updated successfully');
    return updated;
  } catch (error) {
    if (error instanceof Error) $messageApi.error(error.message ?? 'Something went wrong');
  } finally {
    appStore.stopLoading();
  }
}

export async function deleteProduct(product: Product) {
  const appStore = useAppStore();
  const { $messageApi } = useNuxtApp();
  try {
    const proceed = await usePromiseConfirm({
      type: 'error',
      title: 'Delete product',
      content: `Are you sure you want to delete this product : ${product.name}?`,
    });

    if (!proceed) return;
    appStore.startLoading();
    await ApiClient.products.destroy(product.id);
    $messageApi.success('Product deleted successfully');
    return true;
  } catch (error) {
    if (error instanceof Error) {
      $messageApi.error(error.message ?? 'Something went wrong');
    }
  } finally {
    appStore.stopLoading();
  }
}
