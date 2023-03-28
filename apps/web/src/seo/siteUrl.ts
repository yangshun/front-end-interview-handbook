export function getSiteUrl(): string {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT || 3000}`;
  }

  return `https://${
    process.env.NEXT_PUBLIC_VERCEL_URL || 'www.greatfrontend.com'
  }`;
}
