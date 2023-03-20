import type { ComponentProps } from 'react';

export default function MDXImage({ alt, ...props }: ComponentProps<'img'>) {
  return <img alt={alt} className="mx-auto w-full max-w-lg" {...props} />;
}
