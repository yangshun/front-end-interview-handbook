import clsx from 'clsx';
import type { Series } from 'contentlayer/generated';
import { RiArrowRightLine, RiArrowRightSLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeCardBackgroundColor,
  themeLineBackgroundColor,
  themeTextBrandGroupHoverColor,
} from '~/components/ui/theme';

type SeriesItemProps = Readonly<{
  href: string;
  rank: number;
  title: string;
}>;

// TODO(yangshun): consolidate with DashboardStudyGuideList
function SeriesItem({ href, title, rank }: SeriesItemProps) {
  return (
    <div
      className={clsx(
        'group relative flex items-center justify-between px-4 py-3',
        'border border-neutral-200 dark:border-transparent',
        'rounded-lg',
        'transition-colors',
        themeCardBackgroundColor,
        themeBackgroundEmphasizedHover,
      )}>
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className={clsx(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
            'font-bold text-neutral-500 dark:text-neutral-400',
            themeLineBackgroundColor,
          )}
          color="inherit">
          {rank}
        </div>
        <Anchor href={href} variant="unstyled">
          <span aria-hidden={true} className="absolute inset-0" />
          <Text color="subtitle" size="body2" weight="medium">
            {title}
          </Text>
        </Anchor>
      </div>
      <RiArrowRightSLine
        className={clsx(
          'h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400',
          themeTextBrandGroupHoverColor,
        )}
      />
    </div>
  );
}

type Props = Readonly<{
  href: string;
  series: {
    items: ReadonlyArray<Series>;
    title: string;
  };
}>;

export default function BlogBrowseSeries({ href: seeAllHref, series }: Props) {
  const intl = useIntl();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Browser Series"
              description="Browse series section title in blog homepage"
              id="yfYsUt"
            />
          </Heading>
          <Button
            className="-mr-4"
            href={seeAllHref}
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'See all',
              description:
                'See all button label in browse series section in blog homepage',
              id: 'JyoY2G',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <Text size="body2">
          <FormattedMessage
            defaultMessage="Browse content series that are tailored to your experience level!"
            description="Browse series section description in blog homepage"
            id="h76ZX3"
          />
        </Text>
      </div>
      <div className="flex flex-col gap-4">
        <Text size="body3" weight="medium">
          {series.title}
        </Text>
        <div className="flex w-full flex-col gap-2">
          {series.items.map(({ href, slug, title }, index) => (
            <SeriesItem key={slug} href={href} rank={index + 1} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
