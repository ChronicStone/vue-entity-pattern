import type { VNodeChild } from 'vue';
import { NEllipsis, type EllipsisProps } from 'naive-ui';

export function renderTextEllipsis(text: string | VNodeChild, params?: Partial<EllipsisProps>) {
  return <NEllipsis {...params}>{text}</NEllipsis>;
}
