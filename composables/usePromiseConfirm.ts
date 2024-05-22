import { type VNodeChild } from 'vue';

interface DialogOptions {
  type: 'create' | 'success' | 'error' | 'warning' | 'info';
  title: string | (() => VNodeChild);
  content?: string | (() => VNodeChild);
  positiveText?: string;
  negativeText?: string;
  showPositiveAction?: boolean;
  showNegativeAction?: boolean;
  closable?: boolean;
  style?: { [key: string]: string } | string;
}

export function usePromiseConfirm({
  type = 'create',
  title,
  content,
  positiveText,
  negativeText,
  showPositiveAction = true,
  showNegativeAction = true,
  style = {},
}: DialogOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const { $dialogApi } = useNuxtApp();
    $dialogApi?.[type]({
      title,
      content,
      ...(showPositiveAction ? { positiveText: positiveText ?? 'Yes' } : {}),
      ...(showNegativeAction ? { negativeText: negativeText ?? 'No' } : {}),
      style: style ?? {},
      onPositiveClick: () => resolve(true),
      onNegativeClick: () => resolve(false),
      onClose: () => resolve(false),
      onMaskClick: () => resolve(false),
    });
  });
}
