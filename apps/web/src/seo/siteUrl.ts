const previewUrl = 'https://trunk.greatfrontend.com';
const productionUrl = 'https://www.greatfrontend.com';

// This function is used on both server and client, don't add any client-specific code.
export function getSiteOrigin(
  options?: Readonly<{
    // Useful for certain services that don't accept localhost URLs, such as QStash
    usePreviewForDev?: boolean;
  }>,
): string {
  const { usePreviewForDev = false } = options ?? {};

  if (process.env.NODE_ENV === 'development') {
    return usePreviewForDev
      ? previewUrl
      : `http://localhost:${process.env.PORT || 3000}`;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    return previewUrl;
  }

  return productionUrl;
}
