import { ApiClient } from '~/api';

export async function createOrder(params?: { productId?: string }) {
  const appStore = useAppStore();
  const { $messageApi, $formApi } = useNuxtApp();
  try {
    const { formData, isCompleted } = await $formApi.createForm(orderFormSchema(params), {
      buyerId: '',
      productId: '',
      amount: 1,
    });
    if (!isCompleted) return;

    appStore.startLoading();
    const order = await ApiClient.orders.create(formData);
    $messageApi.success('Order created successfully');
    return order;
  } catch (error) {
    if (error instanceof Error) $messageApi.error(error.message ?? 'Something went wrong');
  } finally {
    appStore.stopLoading();
  }
}
