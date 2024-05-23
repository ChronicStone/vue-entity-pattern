export const useUserStore = defineStore('user', () => {
  const route = useRoute();
  const activeEntity = ref<'admin' | 'user'>('admin');
  const { data: users } = useAsyncState(() => getUserOptions());

  const activeUserId = ref<string | null>(null);
  const activeUser = computed(() => users.value?.find((u) => u.value === activeUserId.value));
  const renderKey = computed(() => `${activeEntity.value}-${activeUserId.value}`);

  watch(
    () => users.value,
    (users) => !activeUserId.value && users?.length && (activeUserId.value = users[0].value),
  );

  watch(
    () => renderKey.value,
    () => {
      if (!route.meta.entities) return;
      if (!isEntity(route.meta.entities)) return navigateTo('/');
    },
  );

  return {
    activeEntity,
    users,
    activeUserId,
    activeUser,
  };
});
