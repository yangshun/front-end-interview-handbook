import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiFilterLine,
  RiSearchLine,
  RiSortDesc,
} from 'react-icons/ri';

import type {
  BlogMetadata,
  BlogSortField,
  BlogViewField,
} from '~/components/blog/BlogTypes';
import {
  filterBlogPosts,
  sortBlogPostsMultiple,
} from '~/components/blog/data/BlogPostsProcessor';
import BlogListingFilters from '~/components/blog/filters/BlogListingFilters';
import type { BlogFilterTab } from '~/components/blog/filters/BlogTypeTabs';
import BlogViewDropdown from '~/components/blog/filters/BlogViewDropdown';
import useBlogPostFilters from '~/components/blog/filters/hooks/useBlogPostFilters';
import BlogList from '~/components/blog/filters/items/BlogList';
import BlogCountLabel from '~/components/blog/metadata/BlogCountLabel';
import { FormattedMessage, useIntl } from '~/components/intl';
import CheckboxInput from '~/components/ui/CheckboxInput';
import DropdownMenu from '~/components/ui/DropdownMenu';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Popover from '~/components/ui/Popover';
import SlideOut from '~/components/ui/SlideOut';
import TextInput from '~/components/ui/TextInput';

export type Props = Readonly<{
  filterNamespace: string;
  layout?: 'embedded' | 'explore' | 'full';
  posts: ReadonlyArray<BlogMetadata>;
  showFilters?: boolean;
  type?: Readonly<BlogFilterTab>;
}>;

export default function BlogListingWithFilters({
  filterNamespace,
  layout = 'full',
  posts,
  showFilters = true,
  type = 'articles',
}: Props) {
  const intl = useIntl();
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [sortField, setSortField] = useState<BlogSortField>('createdAt');
  const [viewField, setViewField] = useState<BlogViewField>('list');

  // Filtering.
  const {
    filters,
    levelFilterOptions,
    levelFilters,
    query,
    setQuery,
    tagFilterOptions,
    tagFilters,
  } = useBlogPostFilters({ namespace: filterNamespace });

  // Processing.
  const sortedBlogPosts = sortBlogPostsMultiple(posts, [
    {
      field: sortField,
      isAscendingOrder,
    },
  ]);

  const processedPosts = filterBlogPosts(
    sortedBlogPosts,
    filters.map(([_, filterFn]) => filterFn),
  );

  const numberOfFilters = filters.filter(([size]) => size > 0).length;

  function makeDropdownItemProps(
    label: string,
    itemField: BlogSortField,
    isItemAscendingOrder: boolean,
  ) {
    return {
      isSelected:
        sortField === itemField && isAscendingOrder === isItemAscendingOrder,
      label,
      onClick: () => {
        setSortField(itemField);
        setIsAscendingOrder(isItemAscendingOrder);
      },
    };
  }

  const sortAndFilters = (
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0">
      <div className={clsx(layout === 'full' && 'lg:hidden')}>
        <SlideOut
          size="sm"
          title={intl.formatMessage({
            defaultMessage: 'Filters',
            description: 'Label for filters button',
            id: 'k2Oi+j',
          })}
          trigger={
            <FilterButton
              icon={RiFilterLine}
              isLabelHidden={true}
              label={
                intl.formatMessage({
                  defaultMessage: 'Filters',
                  description: 'Label for filters button',
                  id: 'k2Oi+j',
                }) + (numberOfFilters > 0 ? ` (${numberOfFilters})` : '')
              }
              selected={numberOfFilters > 0}
              size="sm"
            />
          }>
          <BlogListingFilters
            itemGap="spacious"
            levelFilterOptions={levelFilterOptions}
            levelFilters={levelFilters}
            tagFilterOptions={tagFilterOptions}
            tagFilters={tagFilters}
          />
        </SlideOut>
      </div>
      <DropdownMenu
        align="end"
        icon={RiSortDesc}
        label={intl.formatMessage({
          defaultMessage: 'Sort by',
          description: 'Label for sort button',
          id: 'TyQdcx',
        })}
        size="sm">
        {[
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Latest first',
              description: 'Sorting option for blog list',
              id: 'k1dcHz',
            }),
            'createdAt',
            false,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Oldest first',
              description: 'Sorting option for blog list',
              id: 'XjIm4S',
            }),
            'createdAt',
            true,
          ),
        ].map((props) => (
          <DropdownMenu.Item key={props.label} {...props} />
        ))}
      </DropdownMenu>
    </div>
  );
  const searchFilterRow = (
    <div className={clsx('flex justify-end gap-2')}>
      <div className="flex-1">
        <TextInput
          autoComplete="off"
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Search',
            description: 'Search input label',
            id: 'Z30bjj',
          })}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search',
            description: 'Search input label',
            id: 'Z30bjj',
          })}
          size="sm"
          startIcon={RiSearchLine}
          type="search"
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>
      {(layout === 'embedded' || layout === 'explore') && (
        <div className="hidden lg:inline-flex">
          <Popover
            trigger={
              <FilterButton
                addonPosition="end"
                icon={RiArrowDownSLine}
                label={levelFilterOptions.name}
                selected={levelFilters.size > 0}
                size="sm"
              />
            }
            width="sm">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {levelFilterOptions.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <CheckboxInput
                    label={option.label}
                    size="sm"
                    value={levelFilters.has(option.value)}
                    onChange={() => levelFilterOptions.onChange(option.value)}
                  />
                </div>
              ))}
            </div>
          </Popover>
        </div>
      )}
      {layout === 'embedded' && (
        <div className="hidden lg:inline-flex">
          <Popover
            trigger={
              <FilterButton
                addonPosition="end"
                icon={RiArrowDownSLine}
                label={tagFilterOptions.name}
                selected={tagFilters.size > 0}
                size="sm"
              />
            }
            width="sm">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {tagFilterOptions.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <CheckboxInput
                    label={option.label}
                    size="sm"
                    value={tagFilters.has(option.value)}
                    onChange={() => tagFilterOptions.onChange(option.value)}
                  />
                </div>
              ))}
            </div>
          </Popover>
        </div>
      )}
      {layout !== 'explore' && sortAndFilters}
    </div>
  );
  const listMetadata = (
    <div className="flex items-center justify-between">
      <BlogCountLabel
        count={processedPosts.length}
        showIcon={true}
        type={type}
      />
      {showFilters && (
        <BlogViewDropdown viewField={viewField} onChange={setViewField} />
      )}
    </div>
  );

  return (
    <section className="flex flex-col gap-8 lg:col-span-9">
      {showFilters && (
        <div className="flex flex-col gap-4">{searchFilterRow}</div>
      )}
      <div className="flex flex-col gap-4">
        {listMetadata}
        <div>
          <Heading className="sr-only" level="custom">
            <FormattedMessage
              defaultMessage="Blogs List"
              description="Screen reader text indicating the blog list component on blog homepage"
              id="23bxK1"
            />
          </Heading>
          <Section>
            <BlogList posts={processedPosts} type={type} view={viewField} />
          </Section>
        </div>
      </div>
    </section>
  );
}
