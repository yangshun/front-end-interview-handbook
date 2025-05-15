import clsx from 'clsx';
import React from 'react';
import type { IconType } from 'react-icons';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

function StarRight() {
  return (
    <svg
      className="text-brand-dark dark:text-brand"
      height="46"
      viewBox="0 0 25 46"
      width="25"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 0.666504L15.1875 1.22646C16.6975 5.73694 20.0974 9.36592 24.5 11.1665C20.0974 12.9671 16.6975 16.5961 15.1875 21.1066L15 21.6665L14.8125 21.1066C13.3025 16.5961 9.90257 12.9671 5.5 11.1665C9.90257 9.36592 13.3025 5.73694 14.8125 1.22646L15 0.666504Z"
        fill="currentColor"
      />
      <path
        d="M3 39.6665L3.08689 39.9483C3.46069 41.1605 4.34064 42.1517 5.5 42.6665C4.34064 43.1813 3.46069 44.1725 3.08689 45.3847L3 45.6665L2.91311 45.3847C2.53931 44.1725 1.65936 43.1813 0.5 42.6665C1.65936 42.1517 2.53931 41.1605 2.91311 39.9483L3 39.6665Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarLeft() {
  return (
    <svg
      className="text-brand-dark dark:text-brand"
      height="31"
      viewBox="0 0 22 31"
      width="22"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 0.666504L16.1763 1.22949C17.008 3.88573 18.9498 6.05127 21.5 7.1665C18.9498 8.28174 17.008 10.4473 16.1763 13.1035L16 13.6665L15.8237 13.1035C14.992 10.4473 13.0502 8.28174 10.5 7.1665C13.0502 6.05127 14.992 3.88573 15.8237 1.2295L16 0.666504Z"
        fill="currentColor"
      />
      <path
        d="M3 24.6665L3.08689 24.9483C3.46069 26.1605 4.34064 27.1517 5.5 27.6665C4.34064 28.1813 3.46069 29.1725 3.08689 30.3847L3 30.6665L2.91311 30.3847C2.53931 29.1725 1.65936 28.1813 0.5 27.6665C1.65936 27.1517 2.53931 26.1605 2.91311 24.9483L3 24.6665Z"
        fill="currentColor"
      />
    </svg>
  );
}

type BadgeIcon =
  | IconType
  | ((props: React.ComponentProps<'svg'>) => JSX.Element);

type Props = Readonly<{
  icon: BadgeIcon;
  subTitle: string;
  title: string;
}>;

export default function ProjectsChallengeSubmissionSuccessBadge({
  icon: Icon,
  subTitle,
  title,
}: Props) {
  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center gap-5 px-3 pb-6 pt-4 md:w-[244px]',
      )}>
      <div
        className={clsx(
          'relative flex items-center justify-center gap-y-5',
          'size-[52px] rounded-full',
          'dark:bg-brand bg-brand-dark',
          'shadow-brand/30 shadow-[0_0px_24px_8px]',
        )}>
        <div className={clsx('absolute -left-10 -translate-y-1/2')}>
          <StarLeft />
        </div>
        <div className={clsx('absolute -right-12 translate-y-1/4')}>
          <StarRight />
        </div>
        <Icon className="size-7 shrink-0 text-white" />
      </div>
      <div className="text-center">
        <Heading className="capitalize" level="heading5">
          {title}
        </Heading>
        <Text size="body1">{subTitle}</Text>
      </div>
    </div>
  );
}
