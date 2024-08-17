'use client';

import clsx from 'clsx';

import useScrollToTop from '~/hooks/useScrollToTop';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  children?: React.ReactNode;
}>;

export default function GuidesLayoutContent({ children }: Props) {
  const { pathname } = useI18nPathname();

  useScrollToTop([pathname]);

  return (
    <div
      className="theme-bg-radial-glow grow justify-center overflow-auto before:opacity-30 lg:overflow-visible xl:flex"
      style={{
        marginTop: 'calc(var(--global-sticky-height) * -1)',
        paddingTop: 'var(--global-sticky-height)',
      }}>
      <div
        className={clsx(
          'flex grow justify-center gap-x-28 xl:max-w-[1200px] xl:justify-end',
          'px-4 py-12 md:px-6 lg:px-[60px] lg:pb-20',
        )}>
        {children}
      </div>
    </div>
  );
}
