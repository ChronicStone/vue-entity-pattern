import { type WatchSource } from 'vue';

export function useAsyncState<
  T extends (...args: any[]) => Promise<any>,
  Default extends Awaited<ReturnType<T>> | undefined,
  Data = Default extends undefined ? Awaited<ReturnType<T>> | null : Awaited<ReturnType<T>>,
>(
  resolver: T,
  options?: {
    watch?: WatchSource[];
    immediate?: boolean;
    deepWatch?: boolean;
    default?: Default;
    onError?: <T>(err: T) => any;
    onData?: (data: Data) => any;
  },
) {
  const data = ref<Data>((options?.default ?? null) as unknown as Awaited<ReturnType<T>>);
  const pending = ref<boolean>(false);

  async function refresh() {
    try {
      pending.value = true;
      data.value = await resolver();
      options?.onData?.(data.value as Data);
      return data.value;
    } catch (err) {
      options?.onError?.(err);
      console.error(err);
    } finally {
      pending.value = false;
    }
  }

  if (options?.watch) {
    watch(options.watch, refresh, { deep: options?.deepWatch ?? false });
  }

  if (options?.immediate ?? true) {
    refresh();
  }

  return { data, pending, refresh };
}
