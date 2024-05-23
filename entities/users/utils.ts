import { ApiClient } from '~/api';

export function getUserOptions() {
  return ApiClient.users.list().then((users) =>
    users.map((user) => ({
      label: user.firstName + ' ' + user.lastName,
      value: user.id,
      imageUrl: user.imageUrl,
      email: user.email,
    })),
  );
}
