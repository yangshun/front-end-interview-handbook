import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { readBlogPostsAll } from '~/components/blog/data/BlogReader';
import BlogPostCard from '~/components/blog/listing/BlogPostCard';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

const ROW_SIZE = 3;

export default function BlogWhatsNewSection() {
  const intl = useIntl();

  const posts = readBlogPostsAll().slice(0, ROW_SIZE);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="What's new"
            description="Section title for blog home page"
            id="gHQckf"
          />
        </Heading>
        <Button
          className="-mr-4"
          href="/blog/latest"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'See all',
            description: 'See all new posts',
            id: 'n3eIzi',
          })}
          size="md"
          variant="tertiary"
        />
      </div>
      <Section>
        <div
          className={clsx(
            'grid gap-6 md:grid-cols-2',
            posts.length === ROW_SIZE && 'lg:grid-cols-3',
          )}>
          {posts.map((metadata, index) => (
            <div
              key={metadata.href}
              className={clsx(
                index >= ROW_SIZE - 1 && 'lg:col-span-2 xl:col-span-1 xl:block',
              )}>
              <BlogPostCard metadata={metadata} titleLines={2} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
