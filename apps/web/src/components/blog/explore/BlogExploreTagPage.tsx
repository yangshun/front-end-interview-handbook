'use client';

import { startCase } from 'lodash-es';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogExploreTagList from '~/components/blog/explore/BlogExploreTagList';
import { useIntl } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  articles: ReadonlyArray<BlogMetadata>;
  series: ReadonlyArray<BlogMetadata>;
  tag: string;
}>;

export default function BlogExploreTagPage({ articles, series, tag }: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-3">
        <Heading level="heading5">{startCase(tag)}</Heading>
        <Text color="secondary" size="body1">
          {intl.formatMessage(
            {
              defaultMessage: 'Explore articles related to "{tagName}".',
              description: 'Description of GreatFrontEnd blog tag page',
              id: 'pDlGO7',
            },
            { tagName: tag },
          )}
        </Text>
      </div>
      <Section>
        <BlogExploreTagList articles={articles} series={series} tag={tag} />
      </Section>
    </div>
  );
}
