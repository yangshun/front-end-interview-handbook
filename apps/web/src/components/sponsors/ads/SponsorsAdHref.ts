import url from 'url';

export function sponsorsAdTrackingHref({
  adId,
  url: urlParam,
}: Readonly<{ adId: string; url: string }>) {
  return url.format({
    pathname: '/a/click',
    query: {
      a: adId,
      u: urlParam,
    },
  });
}
