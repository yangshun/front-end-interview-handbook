import clsx from 'clsx';
import type { ReactNode } from 'react';

import InterviewsPageHeaderLogo from '~/components/interviews/common/InterviewsPageHeaderLogo';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import InterviewsPageFeatures from './InterviewsPageFeatures';
import InterviewsPageHeaderActions from './InterviewsPageHeaderActions';

type Props = Readonly<{
  beforeDividerElement?: ReactNode;
  children?: ReactNode;
  className?: string;
  description: ReactNode;
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  headingAddOnElement?: ReactNode;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  logo?: React.ReactNode;
  logoImgSrc?: string;
  metadata?: {
    description: string;
    href: string;
    title: string;
  };
  sideElement?: ReactNode;
  title: string;
}>;

export default function InterviewsPageHeader({
  beforeDividerElement,
  children,
  className,
  description,
  features,
  headingAddOnElement,
  logoImgSrc,
  metadata,
  sideElement,
  title,
  ...props
}: Props) {
  const iconEl =
    'logo' in props ? (
      props.logo
    ) : logoImgSrc ? (
      <div
        className={clsx(
          'inline-flex shrink-0 items-center justify-center',
          'size-12 sm:size-14 xl:size-16 rounded-lg shadow-md',
          'bg-white',
        )}>
        <img
          alt={title}
          className="size-7 sm:size-9"
          decoding="async"
          loading="lazy"
          src={logoImgSrc}
        />
      </div>
    ) : props.icon ? (
      <InterviewsPageHeaderLogo icon={props.icon} />
    ) : null;

  return (
    <div className="flex flex-col gap-8">
      {metadata && (
        <InterviewsPageHeaderActions
          className="mb-8 flex w-full justify-end"
          metadata={metadata}
        />
      )}
      <div
        className={clsx(
          'flex w-full flex-col items-start justify-between xl:flex-row',
          'gap-x-6 gap-y-8 sm:gap-y-6',
          className,
        )}>
        <div className={clsx('flex flex-col gap-8 xl:col-span-2')}>
          <div
            className={clsx(
              'flex flex-col',
              iconEl ? 'gap-2 lg:gap-4 xl:gap-6' : 'gap-3.5 xl:gap-4',
            )}>
            <div className="flex items-center gap-6">
              {iconEl}
              <div className="flex items-center gap-4">
                <Heading level="heading4">{title}</Heading>
                {headingAddOnElement}
              </div>
            </div>
            <Text
              className={clsx('block max-w-2xl text-sm xl:text-base')}
              color="subtitle"
              size="inherit"
              weight="medium">
              {description}
            </Text>
          </div>
          {/* Features */}
          <InterviewsPageFeatures features={features} />
        </div>
        {(sideElement || beforeDividerElement) && (
          <div className="flex flex-col gap-4 max-lg:w-full">
            {sideElement}
            {beforeDividerElement}
          </div>
        )}
      </div>
      <Divider />
      {children}
    </div>
  );
}
