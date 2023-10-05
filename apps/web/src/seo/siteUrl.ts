export function getSiteUrl(): string {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT || 3000}`;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    return 'https://dev.greatfrontend.com';
  }

  return 'https://www.greatfrontend.com';
}
