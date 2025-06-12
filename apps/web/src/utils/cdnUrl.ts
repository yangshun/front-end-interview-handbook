export function cdnUrl(pathname: string): string {
  // TODO: Don't load from CDN while we figure out production issue
  // if (!pathname.startsWith('/')) {
  //   throw new Error('Pathname must be a relative path');
  // }

  // if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
  //   return `https://dev.gfecdn.net${pathname}`;
  // }

  // if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
  //   return `https://www.gfecdn.net${pathname}`;
  // }

  return pathname;
}
