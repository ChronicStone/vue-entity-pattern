import { buildFormSchema, buildTableSchema } from '@chronicstone/vue-sweettools';
import { faker } from '@faker-js/faker';
import { email } from '@vuelidate/validators';
import { ApiClient } from '~/api';

export function userTableSchema() {
  return buildTableSchema({
    tableKey: 'users',
    remote: false,
    searchQuery: ['firstName', 'lastName', 'email', 'phoneNumber'],
    filters: [userFilter({ key: 'id', label: 'ID' })],
    columns: [
      { key: 'firstName', label: 'First name', width: 150 },
      { key: 'lastName', label: 'Last name', width: 150 },
      { key: 'status', label: 'Status', width: 150, render: (t) => renderUserStatus(t.status) },
      { key: 'email', label: 'Email', width: 150 },
      { key: 'phoneNumber', label: 'Phone number', width: 150 },
      { key: 'address.country', label: 'Country', width: 150 },
      { key: 'address.postalCode', label: 'City', width: 150 },
      {
        key: 'imageUrl',
        label: 'Image',
        width: 100,
        render: (t) => renderUserAvatar(t, { size: 40, circle: false }),
      },
      { key: 'id', label: 'ID', width: 150 },
    ],
    datasource: ApiClient.users.list,
    actions: [
      {
        label: 'Create',
        icon: 'mdi:plus',
        action: ({ tableApi }) => createUser().then((refresh) => refresh && tableApi.refreshData()),
      },
    ],
    rowActions: [
      {
        label: 'Update',
        icon: 'mdi:pen',
        action: ({ rowData, tableApi }) =>
          updateUser(rowData).then((refresh) => refresh && tableApi.refreshData()),
      },
      //   {
      //     label: 'Delete',
      //     icon: 'mdi:trash',
      //     action: ({ rowData, tableApi }) =>
      //       deleteUser(rowData).then((refresh) => refresh && tableApi.refreshData()),
      //   },
    ],
  });
}

export function userFormSchema(params: { mode: 'create' | 'update' }) {
  return buildFormSchema({
    title: params.mode === 'create' ? 'Create user' : 'Update user',
    maxWidth: '800px',
    fields: [
      {
        key: 'firstName',
        label: 'First name',
        type: 'text',
        required: true,
      },
      {
        key: 'lastName',
        label: 'Last name',
        type: 'text',
        required: true,
      },
      {
        key: 'email',
        label: 'Email',
        type: 'text',
        required: true,
        validators: {
          email,
        },
      },
      {
        key: 'phoneNumber',
        label: 'Phone number',
        type: 'text',
        required: false,
      },
      {
        label: 'Address',
        key: 'address',
        type: 'object',
        size: 8,
        collapsible: false,
        fields: [
          {
            key: 'street',
            label: 'Street',
            type: 'text',
            required: true,
          },
          {
            key: 'city',
            label: 'City',
            type: 'text',
            required: true,
          },
          {
            key: 'state',
            label: 'State',
            type: 'text',
            required: true,
          },
          {
            key: 'postalCode',
            label: 'Postal code',
            type: 'text',
            required: true,
          },
          {
            key: 'country',
            label: 'Country',
            type: 'select',
            required: true,
            options: getCountries,
          },
        ],
      },
      {
        key: 'imageUrl',
        size: 8,
        type: 'upload',
        label: 'Profile image',
        required: true,
        output: 'url',
        fieldParams: {
          listType: 'image-card',
          accept: 'image/*',
          max: 1,
        },
        multiple: false,
        uploadHandler: (opts) => {
          opts.file.status = 'finished';
          opts.file.url = faker.image.avatar();
          opts.onFinish();
        },
      },
    ],
  });
}
