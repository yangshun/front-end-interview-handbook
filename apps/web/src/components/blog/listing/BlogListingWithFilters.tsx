import clsx from 'clsx';
import { useState } from 'react';
import { RiFilterLine, RiSearchLine, RiSortDesc } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type {
  BlogMetadata,
  BlogSortField,
  BlogViewField,
} from '~/components/blog/BlogTypes';
import BlogListingFilters from '~/components/blog/filters/BlogListingFilters';
import {
  filterBlogs,
  sortBlogsMultiple,
} from '~/components/blog/filters/BlogsProcessor';
import type { FilterTab } from '~/components/blog/filters/BlogTypeTabs';
import BlogViewDropdown from '~/components/blog/filters/BlogViewDropdown';
import useBlogFilters from '~/components/blog/filters/hooks/useBlogFilters';
import BlogFilterButton from '~/components/blog/filters/items/BlogFilterButton';
import BlogList from '~/components/blog/filters/items/BlogList';
import BlogCountLabel from '~/components/blog/metadata/BlogCountLabel';
import CheckboxInput from '~/components/ui/CheckboxInput';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Popover from '~/components/ui/Popover';
import SlideOut from '~/components/ui/SlideOut';
import TextInput from '~/components/ui/TextInput';

export type Props = Readonly<{
  blogs: ReadonlyArray<BlogMetadata>;
  layout?: 'embedded' | 'explore' | 'full';
  namespace: string;
  showFilters?: boolean;
  type?: Readonly<FilterTab>;
}>;

export default function BlogListingWithFilters({
  layout = 'full',
  namespace,
  blogs,
  showFilters = true,
  type = 'articles',
}: Props) {
  const intl = useIntl();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [sortField, setSortField] = useState<BlogSortField>('createdAt');
  const [viewField, setViewField] = useState<BlogViewField>('list');

  // Filtering.
  const {
    query,
    setQuery,
    levelFilters,
    levelFilterOptions,
    tagFilters,
    tagFilterOptions,
    filters,
  } = useBlogFilters({ namespace });

  // Processing.
  const sortedBlogs = sortBlogsMultiple(blogs, [
    {
      field: sortField,
      isAscendingOrder,
    },
  ]);

  const processedBlogs = filterBlogs(
    sortedBlogs,
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
        setSortField(itemField), setIsAscendingOrder(isItemAscendingOrder);
      },
    };
  }

  const sortAndFilters = (
    <div className="flex shrink-0 justify-end gap-2 sm:pt-0">
      <div className={clsx(layout === 'full' && 'lg:hidden')}>
        <BlogFilterButton
          icon={RiFilterLine}
          isLabelHidden={true}
          label={
            intl.formatMessage({
              defaultMessage: 'Filters',
              description: 'Label for filters button',
              id: 'k2Oi+j',
            }) + (numberOfFilters > 0 ? ` (${numberOfFilters})` : '')
          }
          purpose="button"
          selected={numberOfFilters > 0}
          size="sm"
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>
      <SlideOut
        isShown={mobileFiltersOpen}
        size="sm"
        title={intl.formatMessage({
          defaultMessage: 'Filters',
          description: 'Label for filters button',
          id: 'k2Oi+j',
        })}
        onClose={() => {
          setMobileFiltersOpen(false);
        }}>
        <BlogListingFilters
          itemGap="spacious"
          levelFilterOptions={levelFilterOptions}
          levelFilters={levelFilters}
          tagFilterOptions={tagFilterOptions}
          tagFilters={tagFilters}
        />
      </SlideOut>
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
            true,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Oldest first',
              description: 'Sorting option for blog list',
              id: 'XjIm4S',
            }),
            'createdAt',
            false,
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
            description: 'Placeholder for search input of blog list',
            id: 'SZ26iB',
          })}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search',
            description: 'Placeholder for search input of blog list',
            id: 'SZ26iB',
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
          <Popover label={levelFilterOptions.name} size="sm" width="sm">
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
          <Popover label={tagFilterOptions.name} size="sm" width="sm">
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
        count={processedBlogs.length}
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
            <BlogList blogs={processedBlogs} type={type} view={viewField} />
          </Section>
        </div>
      </div>
    </section>
  );
}
