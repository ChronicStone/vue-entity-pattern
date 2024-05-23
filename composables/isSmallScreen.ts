import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export function useIsSmallScreen() {
  const { smallerOrEqual } = useBreakpoints(breakpointsTailwind);
  return smallerOrEqual('md');
}
