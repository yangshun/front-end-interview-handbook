import clsx from 'clsx';
import type { ReactNode } from 'react';

import InterviewsPageHeaderLogo from '~/components/interviews/common/InterviewsPageHeaderLogo';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import InterviewsPageFeatures from './InterviewsPageFeatures';
import InterviewsPageHeaderActions from './InterviewsPageHeaderActions';

type Props = Readonly<{
  children?: ReactNode;
  description: ReactNode;
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
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
  children,
  description,
  features,
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
          'size-16 rounded-lg shadow-md',
          'bg-white',
        )}>
        <img
          alt={title}
          className="size-9"
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
      <div className="grid gap-x-6 gap-y-8 xl:grid-cols-3">
        <div
          className={clsx(
            'flex flex-col xl:col-span-2',
            iconEl ? 'gap-8' : 'gap-4',
          )}>
          <div className="flex items-center gap-6">
            {iconEl}
            <Heading level="heading4">{title}</Heading>
          </div>
          <Text className="block" color="subtitle" size="body1" weight="medium">
            {description}
          </Text>
        </div>
        {sideElement && (
          <div className="col-span-1 flex lg:justify-end">{sideElement}</div>
        )}
      </div>
      {/* Features */}
      <InterviewsPageFeatures features={features} />
      <Divider />
      {children}
    </div>
  );
}
