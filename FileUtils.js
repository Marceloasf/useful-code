export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB'
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const downloadFile = file => {
  const decodedFile = dataURLtoFile(
    `data:${file.type};base64,${file.content}`,
    file.name
  );

  const url = window.URL.createObjectURL(new Blob([decodedFile]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', file.name);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[arr.length - 1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], filename, { type: mime });
};
