'use client';

import { useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';

import { readBlogSeriesAll } from '~/components/blog/data/BlogReader';
import BlogList from '~/components/blog/filters/items/BlogList';
import BlogExploreSeriesDropdown from '~/components/blog/series/BlogExploreSeriesDropdown';
import { BlogExploreSeriesSidebar } from '~/components/blog/series/BlogExploreSeriesSidebar';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import { getAllBlogCategories } from '~/db/contentlayer/blog/BlogCategoryReader';

export default function BlogExplorePage() {
  const intl = useIntl();
  const categories = getAllBlogCategories();
  const [activeItem, setActiveItem] = useState(categories[0].source);

  const allSeries = readBlogSeriesAll(activeItem);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-3">
        <div>
          <Button
            addonPosition="start"
            className="-mb-2 -ml-5"
            href="/blog"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to home',
              description: 'Link text to navigate to blog home page',
              id: 'JaQOv1',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Explore series"
            description="Explore series page title"
            id="X6kis4"
          />
        </Heading>
        <Text className="block max-w-3xl" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Here you'll find a curated collection of our most insightful and engaging blog content, neatly organized into series for your convenience. Each series focuses on a unique theme or topic providing a deep dive subject."
            description="Explore series page description"
            id="aqy8J+"
          />
        </Text>
      </div>
      <div className="flex flex-col gap-x-4 gap-y-3 lg:flex-row lg:gap-x-6 xl:gap-x-10">
        <div className="hidden lg:contents">
          <BlogExploreSeriesSidebar
            activeItem={activeItem}
            navigation={categories}
            onChange={setActiveItem}
          />
        </div>
        <div className="block w-full lg:hidden">
          <BlogExploreSeriesDropdown
            activeItem={activeItem}
            navigation={categories}
            onChange={setActiveItem}
          />
        </div>

        <BlogList posts={allSeries} showSeriesTag={false} type="series" />
      </div>
    </div>
  );
}
