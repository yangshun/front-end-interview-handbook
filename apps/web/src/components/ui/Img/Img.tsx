import type { ForwardedRef } from 'react';
import React, { forwardRef } from 'react';

import { cdnUrl } from '~/utils/cdnUrl';

type Props = React.ImgHTMLAttributes<HTMLImageElement> &
  Readonly<{
    alt: string | undefined;
    src?: string | undefined;
  }>;

function Img(
  { src: srcParam, alt, ...rest }: Props,
  ref: ForwardedRef<HTMLImageElement>,
) {
  const src = srcParam?.startsWith('/') ? cdnUrl(srcParam) : srcParam;

  return <img ref={ref} alt={alt} src={src} {...rest} />;
}

export default forwardRef(Img);
