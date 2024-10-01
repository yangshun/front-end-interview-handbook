import type { BlogSeries } from 'contentlayer/generated';
import { RiArrowRightLine } from 'react-icons/ri';

import RankNavigationItem from '~/components/common/RankNavigationItem';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  href: string;
  seriesList: ReadonlyArray<BlogSeries>;
}>;

export default function BlogBrowseSeries({
  href: seeAllHref,
  seriesList,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Browse series"
              description="Browse series section title in blog homepage"
              id="0gmEji"
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
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Browse content series that are tailored to your experience level."
            description="Browse series section description in blog homepage"
            id="1Fl422"
          />
        </Text>
      </div>
      <div className="flex w-full flex-col gap-2">
        {seriesList.map(({ href, slug, title }, index) => (
          <RankNavigationItem
            key={slug}
            href={href}
            rank={index + 1}
            title={title}
          />
        ))}
      </div>
    </div>
  );
}
