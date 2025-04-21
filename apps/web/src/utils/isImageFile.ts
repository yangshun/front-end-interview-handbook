export function isImageFile(filePath: string) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp|heif|svg|pdf|psd)$/i.test(filePath);
}
