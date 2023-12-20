'use client';

import clsx from 'clsx';
import { allCategories } from 'contentlayer/generated';
import { useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import BlogExploreSeriesDropdown from '~/components/blog/BlogExploreSeriesDropdown';
import { BlogExploreSeriesSidebar } from '~/components/blog/BlogExploreSeriesSidebar';
import BlogList from '~/components/blog/filters/items/BlogList';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import { getAllSeries } from '~/contentlayer/utils';

export default function BlogExplorePage() {
  const intl = useIntl();
  const [activeItem, setActiveItem] = useState(allCategories[0].source);

  const allSeries = getAllSeries(activeItem);

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
              defaultMessage: 'Back to Home',
              description: 'Link text to navigate to blog home page',
              id: 'mShEXL',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Explore Series"
            description="Explore series page title"
            id="etN1a1"
          />
        </Heading>
        <Text
          className={clsx('max-w-3xl')}
          color="secondary"
          display="block"
          size="body2">
          <FormattedMessage
            defaultMessage="Here you'll find a curated collection of our most insightful and engaging blog content, neatly organized into series for your convenience. Each series focuses on a unique theme or topic providing a deep dive subject."
            description="Explore series page description"
            id="aqy8J+"
          />
        </Text>
      </div>
      <div className="flex flex-col gap-x-10 gap-y-3 lg:flex-row">
        <div className="hidden lg:contents">
          <BlogExploreSeriesSidebar
            activeItem={activeItem}
            navigation={allCategories}
            onChange={setActiveItem}
          />
        </div>
        <div className="block w-full lg:hidden">
          <BlogExploreSeriesDropdown
            activeItem={activeItem}
            navigation={allCategories}
            onChange={setActiveItem}
          />
        </div>

        <BlogList blogs={allSeries} showSeriesTag={false} />
      </div>
    </div>
  );
}
