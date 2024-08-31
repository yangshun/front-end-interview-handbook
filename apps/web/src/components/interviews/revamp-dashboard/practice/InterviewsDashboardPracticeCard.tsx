import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeTextBrandColor_GroupHover,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  children: ReactNode;
  description: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title: string;
}>;

export default function InterviewsDashboardPracticeCard({
  children,
  title,
  description,
  href,
  icon: Icon,
}: Props) {
  const arrow = (
    <RiArrowRightLine
      className={clsx(
        'size-6 transition-colors',
        themeTextSubtleColor,
        themeTextBrandColor_GroupHover,
      )}
    />
  );

  return (
    <div
      className={clsx(
        'flex-2 group relative flex flex-col gap-6 md:flex-row',
        'rounded-lg p-6',
        'transition',
        'bg-neutral-200/40 dark:bg-neutral-800/40',
        ['border', themeBorderElementColor],
        'isolate',
      )}>
      <div
        className={clsx(
          'flex items-center justify-center',
          'rounded-md',
          'size-10 shrink-0',
          themeBackgroundLayerEmphasized,
          ['border', themeBorderElementColor],
        )}>
        <Icon className={clsx('size-6', themeTextSubtitleColor)} />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <Anchor className="flex-1" href={href} variant="unstyled">
                <span aria-hidden={true} className="absolute inset-0" />
                <Text size="body1" weight="medium">
                  {title}
                </Text>
              </Anchor>
              <div className="block md:hidden">{arrow}</div>
            </div>

            <Text color="secondary" size="body2">
              {description}
            </Text>
          </div>
          <div className="hidden md:block">{arrow}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
