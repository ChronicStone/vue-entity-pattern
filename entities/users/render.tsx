import {
  NTag,
  type TagProps,
  NAvatar,
  type SelectRenderTag,
  type SelectRenderLabel,
  NText,
  type AvatarProps,
  NEllipsis,
} from 'naive-ui';
import { match } from 'ts-pattern';
import type { User, UserStatus } from '../../types/entities/user';

export function renderUserStatus(status: UserStatus) {
  const color = match(status)
    .with('Active', () => 'success' as const)
    .with('Inactive', () => 'default' as const)
    .exhaustive();

  return <NTag type={color}>{status}</NTag>;
}

export function renderUserTag(user: User, params?: Partial<TagProps>) {
  return (
    <NTag {...params} size={params?.size} round={params?.round ?? true} bordered={params?.bordered ?? false}>
      {{
        default: () => (
          <span>
            {user.firstName} {user.lastName}
          </span>
        ),
        avatar: () =>
          user.imageUrl ? (
            <NAvatar src={user.imageUrl} />
          ) : (
            <NAvatar>{`${user.firstName.charAt(0)} ${user.lastName.charAt(0)}`}</NAvatar>
          ),
      }}
    </NTag>
  );
}

export function renderUserAvatar(
  user: Pick<User, 'firstName' | 'lastName' | 'imageUrl'>,
  params?: Partial<AvatarProps>,
) {
  return user.imageUrl ? (
    <NAvatar
      {...params}
      size={params?.size}
      round={params?.round ?? true}
      bordered={params?.bordered ?? false}
      src={user.imageUrl}
    />
  ) : (
    <NAvatar
      {...params}
      size={params?.size}
      round={params?.round ?? true}
      bordered={params?.bordered ?? false}
    >
      {`${user.firstName.charAt(0)} ${user.lastName.charAt(0)}`}
    </NAvatar>
  );
}

export const renderUserSelectTag: (params: { multiple: boolean }) => SelectRenderTag =
  (params) =>
  ({ option, handleClose }) =>
    !params.multiple ? (
      <div class="flex items-center">
        <NAvatar size={24} round src={option.imageUrl as string} />
        <span class="ml-2">{option.label}</span>
      </div>
    ) : (
      <NTag
        disabled={option.disabled ?? false}
        style={{ padding: '0 6px 0 4px' }}
        round
        closable
        onClose={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <div class="flex items-center gap-1">
          <NAvatar size={22} round src={option.imageUrl as string} />
          <span class="ml-2">{option.label}</span>
        </div>
      </NTag>
    );

export const renderUserSelectLabel: SelectRenderLabel = (option) => {
  return (
    <div class="flex items-center gap-3 p-1">
      <div class="h-fit w-5 mr-2">
        <NAvatar size={30} round src={option.imageUrl as string} />
      </div>
      <div class="flex flex-col ">
        <span>{option.label}</span>
        <NText depth={3} tag="span">
          {option.email}
        </NText>
      </div>
    </div>
  );
};
