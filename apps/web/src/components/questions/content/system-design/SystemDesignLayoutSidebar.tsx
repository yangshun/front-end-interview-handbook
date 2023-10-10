'use client';

import useScrollToTop from '~/hooks/useScrollToTop';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SystemDesignLayoutSidebar({ children }: Props) {
  const { pathname } = useI18nPathname();

  useScrollToTop([pathname]);

  return (
    <div
      className="theme-bg-radial-glow before:opacity-30"
      style={{
        marginTop: 'calc(var(--navbar-height) * -1)',
        paddingTop: 'var(--navbar-height)',
      }}>
      <div className="flex w-full">{children}</div>
    </div>
  );
}
