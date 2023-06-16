import clsx from 'clsx';
import { RiArrowRightLine, RiArrowRightSLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';

type GuideItemProps = {
  href: string;
  rank: number;
  title: string;
};

function GuideItem({ href, title, rank }: GuideItemProps) {
  return (
    <Anchor href={href} variant="unstyled">
      <div
        className={clsx(
          'flex justify-between rounded-lg bg-neutral-50 py-3 px-4 dark:bg-neutral-800/40',
          'border border-neutral-200 dark:border-transparent',
        )}>
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 font-bold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
            {rank}
          </div>
          <Text size="body2" weight="medium">
            {title}
          </Text>
        </div>
        <RiArrowRightSLine className={clsx('h-5 w-5', themeIconColor)} />
      </div>
    </Anchor>
  );
}

type Props = Readonly<{
  items: ReadonlyArray<{
    description?: string;
    href: string;
    slug: string;
    title: string;
  }>;
}>;

export default function QuestionsGuidesList({ items }: Props) {
  const intl = useIntl();

  return (
    <div className="grid w-full gap-4">
      <div className="flex items-center justify-between">
        <Heading level="heading4">
          <FormattedMessage
            defaultMessage="Study guides"
            description="Study guides list section title in preparation dashboard"
            id="qR472c"
          />
        </Heading>
        <Button
          className="-mr-4"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'See all',
            description:
              'See all button label in study guides list section in preparation dashboard',
            id: 'mLRZ25',
          })}
          size="md"
          variant="tertiary"
        />
      </div>
      <div className="grid w-full gap-2">
        {items.map(({ href, slug, title }, index) => (
          <GuideItem key={slug} href={href} rank={index + 1} title={title} />
        ))}
      </div>
    </div>
  );
}
