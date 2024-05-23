import { ApiClient } from '~/api';
import type { User } from '~/types/entities/user';

export async function createUser() {
  const { $formApi, $messageApi } = useNuxtApp();
  try {
    const { formData, isCompleted } = await $formApi.createForm(userFormSchema({ mode: 'create' }));
    if (!isCompleted) return;

    const user = await ApiClient.users.create(formData);
    $messageApi.success('User created successfully');
    return user;
  } catch (error) {
    if (error instanceof Error) $messageApi.error(error.message ?? 'Something went wrong');
  }
}

export async function updateUser(user: User) {
  const { $formApi, $messageApi } = useNuxtApp();
  try {
    const { formData, isCompleted } = await $formApi.createForm(userFormSchema({ mode: 'update' }), user);
    if (!isCompleted) return;

    const updatedUser = await ApiClient.users.update(user.id, formData);
    $messageApi.success('User updated successfully');
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) $messageApi.error(error.message ?? 'Something went wrong');
  }
}

export async function deleteUser(user: User) {
  const appStore = useAppStore();
  const { $messageApi } = useNuxtApp();
  try {
    const proceed = await usePromiseConfirm({
      type: 'error',
      title: 'Delete user',
      content: `Are you sure you want to delete this user : ${user.email} ?`,
    });

    if (!proceed) return;
    appStore.startLoading();
    await ApiClient.users.destroy(user.id);
    $messageApi.success('User deleted successfully');
    return true;
  } catch (error) {
    if (error instanceof Error) {
      $messageApi.error(error.message ?? 'Something went wrong');
    }
  } finally {
    appStore.stopLoading();
  }
}
