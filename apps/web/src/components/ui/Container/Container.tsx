import clsx from 'clsx';
import React from 'react';

type ContainerWidth =
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'lg'
  | 'md'
  | 'screen-2xl'
  | 'xl';
type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  width?: ContainerWidth;
}>;

const widthStyles: Record<ContainerWidth, string> = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  lg: 'max-w-lg',
  md: 'max-w-md',
  'screen-2xl': 'max-w-screen-2xl',
  xl: 'max-w-xl',
};

export default function Container({
  children,
  className,
  width = '6xl',
}: Props) {
  return (
    <div
      className={clsx(
        'mx-auto w-full',
        'px-4 md:px-6 lg:px-8 xl:px-[3.75rem]',
        widthStyles[width],
        className,
      )}>
      {children}
    </div>
  );
}
