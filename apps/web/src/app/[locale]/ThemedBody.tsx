'use client';

import clsx from 'clsx';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';

export default function ThemedBody({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <body className={clsx(className, !mounted && 'invisible')} {...props} />
  );
}
