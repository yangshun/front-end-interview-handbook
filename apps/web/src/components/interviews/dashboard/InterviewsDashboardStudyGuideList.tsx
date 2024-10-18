import { RiArrowRightLine } from 'react-icons/ri';

import RankNavigationItem from '~/components/common/RankNavigationItem';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';

type Props = Readonly<{
  href: string;
  items: ReadonlyArray<{
    cardTitle?: string;
    description?: string;
    href: string;
    label: string;
    slug: string;
  }>;
}>;

export default function InterviewsDashboardStudyGuideList({
  href: seeAllHref,
  items,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Study guides"
            description="Study guides list section title in preparation dashboard"
            id="qR472c"
          />
        </Heading>
        <Button
          className="-mr-4"
          href={seeAllHref}
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
      <div className="flex w-full flex-col gap-2">
        {items.map(({ cardTitle, href, slug, label }, index) => (
          <RankNavigationItem
            key={slug}
            href={href}
            rank={index + 1}
            title={cardTitle ?? label}
          />
        ))}
      </div>
    </div>
  );
}
