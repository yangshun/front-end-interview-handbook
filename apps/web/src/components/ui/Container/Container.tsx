import clsx from 'clsx';
import React from 'react';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  variant?: '3xl' | '4xl' | '5xl' | 'lg' | 'md' | 'narrow' | 'normal';
}>;

export default function Container({
  children,
  className,
  variant = 'normal',
}: Props) {
  return (
    <div
      className={clsx(
        'xl:px-[3.75rem] mx-auto w-full px-4 md:px-6 lg:px-8',
        variant === 'normal' && 'max-w-7xl',
        variant === 'narrow' && 'max-w-6xl',
        variant === '5xl' && 'max-w-5xl',
        variant === '4xl' && 'max-w-4xl',
        variant === '3xl' && 'max-w-3xl',
        variant === 'lg' && 'max-w-lg',
        variant === 'md' && 'max-w-md',
        className,
      )}>
      {children}
    </div>
  );
}
