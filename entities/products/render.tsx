import { match } from 'ts-pattern';
import { NTag, NPopover, NAvatar } from 'naive-ui';
import type { Product, ProductStatus } from '~/types/entities/product';

export function renderProductStatus(status: ProductStatus) {
  const color = match(status)
    .with('Active', () => 'success' as const)
    .with('Draft', () => 'warning' as const)
    .with('Disabled', () => 'default' as const)
    .exhaustive();

  return <NTag type={color}>{status}</NTag>;
}

export function renderProductTags(tags: string[], limit?: number) {
  const [visible, rest] = tags.reduce(
    (acc, tag) => {
      if (!limit) {
        acc[0].push(tag);
        return acc;
      }
      if (acc[0].length < 2) acc[0].push(tag);
      else acc[1].push(tag);
      return acc;
    },
    [[], []] as [string[], string[]],
  );
  return (
    <div class="flex flex-wrap gap-1">
      {visible.map((tag) => (
        <NTag type="info">{tag}</NTag>
      ))}
      {rest.length > 0 && (
        <NPopover>
          {{
            trigger: () => (
              <NTag type="default" class="text-xs">
                + {rest.length}
              </NTag>
            ),
            default: () => (
              <div class="flex flex-wrap gap-1 max-w-50 w-fit">
                {rest.map((tag) => (
                  <NTag type="info">{tag}</NTag>
                ))}
              </div>
            ),
          }}
        </NPopover>
      )}
    </div>
  );
}

export function renderProductPopoverCard(product: Product) {
  return (
    // <NPopover>
    //   {{
    //     trigger: () => (
    <NTag>
      {{
        default: () => product.name,
        avatar: () => <NAvatar src={product.images[0]} />,
      }}
    </NTag>
    //     ),
    //     default: () => (
    //   }}
    // </NPopover>
  );
}
