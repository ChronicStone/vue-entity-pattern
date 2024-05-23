export const useUserStore = defineStore('user', () => {
  const activeEntity = ref<'admin' | 'user'>('admin');
  const { data: users } = useAsyncState(() => getUserOptions());

  const activeUserId = ref<string | null>(null);
  const activeUser = computed(() => users.value?.find((u) => u.value === activeUserId.value));

  watch(
    () => users.value,
    (users) => !activeUserId.value && users?.length && (activeUserId.value = users[0].value),
  );

  return {
    activeEntity,
    users,
    activeUserId,
    activeUser,
  };
});
