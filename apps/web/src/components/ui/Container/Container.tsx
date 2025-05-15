import clsx from 'clsx';
import type { CSSProperties, HTMLAttributes } from 'react';
import React from 'react';

type ContainerWidth =
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'app'
  | 'lg'
  | 'marketing'
  | 'md'
  | 'screen-2xl'
  | 'screen-xl'
  | 'xl';

type Props = HTMLAttributes<HTMLElement> &
  Readonly<{
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    tag?: 'div' | 'section';
    width?: ContainerWidth;
  }>;

const widthStyles: Record<ContainerWidth, string> = {
  '2xl': clsx('max-w-2xl', 'max-lg:px-6'),
  '3xl': clsx('max-w-3xl', 'max-lg:px-6'),
  '4xl': clsx('max-w-4xl', 'max-lg:px-6'),
  '5xl': clsx('max-w-5xl', 'max-lg:px-6'),
  '6xl': clsx('max-w-6xl', 'max-lg:px-6'),
  '7xl': clsx('max-w-7xl', 'max-lg:px-6'),
  app: clsx(
    'max-w-[1400px]', // 1280 + 60 * 2
    'px-6 lg:px-10 xl:px-[60px]',
  ),
  lg: clsx('max-w-lg', 'max-lg:px-6'),
  marketing: clsx(
    '2xl:max-w-[1152px]', // 1104 + 24 * 2
    'px-6 min-[1260px]:max-2xl:px-[168px]',
  ),
  md: clsx('max-w-md', 'max-lg:px-6'),
  'screen-2xl': clsx('max-w-screen-2xl', 'max-2xl:px-6'),
  'screen-xl': clsx('max-w-screen-xl', 'max-xl:px-6'),
  xl: clsx('max-w-xl', 'max-lg:px-6'),
};

export default function Container({
  children,
  className,
  tag: ContainerTag = 'div',
  width = '6xl',
  ...props
}: Props) {
  return (
    <ContainerTag
      className={clsx('mx-auto w-full', widthStyles[width], className)}
      {...props}>
      {children}
    </ContainerTag>
  );
}
