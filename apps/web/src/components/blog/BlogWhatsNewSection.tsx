import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import BlogCard from '~/components/blog/BlogCard';
import Button from '~/components/ui/Button';
import CardContainer from '~/components/ui/Card/CardContainer';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { getAllPosts } from '~/contentlayer/utils';

export default function BlogWhatsNewSection() {
  const intl = useIntl();

  const blogs = getAllPosts({ sort: true }).slice(0, 3);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Heading className="text-xl font-semibold" level="custom">
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
            description: 'See all new blogs',
            id: 'xgFUi6',
          })}
          size="md"
          variant="tertiary"
        />
      </div>
      <Section>
        <CardContainer
          className={clsx(
            'grid gap-6 lg:grid-cols-2',
            blogs.length === 3 && 'xl:grid-cols-3',
          )}>
          {blogs.map((metadata, index) => (
            <div
              key={metadata.href}
              className={clsx(
                index >= 2 && 'lg:col-span-2 xl:col-span-1 xl:block',
              )}>
              <BlogCard metadata={metadata} titleLines={2} />
            </div>
          ))}
        </CardContainer>
      </Section>
    </div>
  );
}
