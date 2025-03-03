import url from 'url';

export function sponsorsAdTrackingHref({
  id,
  url: urlParam,
}: Readonly<{ id: string; url: string }>) {
  return url.format({
    pathname: '/ads/click',
    query: {
      a: id,
      u: urlParam,
    },
  });
}
