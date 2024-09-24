export const FB_PIXEL_ID = '213222811360903';

export const fbqGFE: facebook.Pixel.Event = (...params) => {
  // Log analytics only in production.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    console.info('[fbq]', ...params);

    return;
  }

  // @ts-expect-error: No easy way to wrap an overloaded function
  // https://github.com/microsoft/TypeScript/issues/32164
  return fbq(...params);
};
