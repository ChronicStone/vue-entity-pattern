import { buildFormSchema } from '@chronicstone/vue-sweettools';

export function excelExportFileName(params: { title: string; defaultName: string }) {
  return buildFormSchema({
    title: params.title,
    maxWidth: '500px',
    fields: [
      {
        key: 'fileName',
        label: 'Name',
        type: 'text',
        required: true,
        default: params.defaultName,
        size: 8,
      },
    ],
  });
}
