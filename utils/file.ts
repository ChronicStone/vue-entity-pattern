export function downloadSpreadsheet(params: { buffer: Buffer; fileName: string }) {
  const blob = new Blob([params.buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = params.fileName;
  link.click();
  URL.revokeObjectURL(url);
}
