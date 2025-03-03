import url from 'url';

export function sponsorsAdTrackingHref({
  adId,
  url: urlParam,
}: Readonly<{ adId: string; url: string }>) {
  return url.format({
    pathname: '/ads/click',
    query: {
      a: adId,
      u: urlParam,
    },
  });
}
