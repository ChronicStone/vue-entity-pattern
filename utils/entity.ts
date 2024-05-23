export function isEntity(value: Array<'admin' | 'user'>) {
  const userStore = useUserStore();
  return value.includes(userStore.activeEntity);
}
