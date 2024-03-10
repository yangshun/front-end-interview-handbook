export const FB_PIXEL_ID = '213222811360903';

export const fbqGFE: facebook.Pixel.Event = (...params) => {
  // Don't log analytics during development.
  if (process.env.NODE_ENV === 'development') {
    console.info('[fbq]', ...params);

    return;
  }

  // @ts-expect-error: No easy way to wrap an overloaded function
  // https://github.com/microsoft/TypeScript/issues/32164
  return fbq(...params);
};
