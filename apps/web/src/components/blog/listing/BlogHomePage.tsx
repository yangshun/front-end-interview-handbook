'use client';

import type { BlogSeries } from 'contentlayer/generated';

import BlogWhatsNewSection from '~/components/blog/BlogWhatsNewSection';
import BlogListingSection from '~/components/blog/listing/BlogListingSection';
import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  allSeries: ReadonlyArray<BlogSeries>;
}>;

export default function BlogHomePage({ allSeries }: Props) {
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <Heading level="heading4">
          <FormattedMessage
            defaultMessage="GreatFrontEnd Blog"
            description="Blog home page title"
            id="uMAaCa"
          />
        </Heading>
        <Text
          className="block max-w-3xl"
          color="subtitle"
          size="body1"
          weight="medium">
          <FormattedMessage
            defaultMessage="Learn new skills, improve your techniques and stay updated on latest front end trends and developments."
            description="Blog home page description"
            id="sUQjXK"
          />
        </Text>
      </div>
      <Section>
        <BlogWhatsNewSection />
      </Section>
      <Section>
        <BlogListingSection allSeries={allSeries} />
      </Section>
    </>
  );
}
