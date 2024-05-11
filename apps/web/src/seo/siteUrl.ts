// This function is used on both server and client, don't add any client-specific code.
export function getSiteOrigin(): string {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT || 3000}`;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    return 'https://dev.greatfrontend.com';
  }

  return 'https://www.greatfrontend.com';
}
