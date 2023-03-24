'use client';

import { useI18nPathname } from 'next-i18nostic';
import { ArticleJsonLd } from 'next-seo';
import { Fragment, useRef } from 'react';

import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Abstract from '~/components/ui/Prose/Abstract';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import type {
  GuidesNavigation,
  GuidesNavigationLink,
  GuidesNavigationLinks,
} from './GuidesLayoutSidebar';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import QuestionPagination from '../questions/content/QuestionPagination';

type GuidesNavigationLinkFlat = GuidesNavigationLink & {
  breadcrumbs: Array<string>;
};

type Props = Readonly<{
  children?: React.ReactNode;
  description: string;
  navigation: GuidesNavigation; // TODO: Consider reading from context instead.
  tableOfContents?: TableOfContents;
  title: string;
}>;

function flattenNavigationItems({ title, items }: GuidesNavigation) {
  const flatItems: Array<GuidesNavigationLinkFlat> = [];
  const crumbs: Array<string> = [title];

  function flatten(
    links: GuidesNavigationLinks | null | undefined,
    breadcrumbs: Array<string>,
  ) {
    if (links == null || links.length === 0) {
      return;
    }

    links.forEach((link) => {
      const newBreadcrumbs = [...breadcrumbs, link.title];

      flatItems.push({ ...link, breadcrumbs: newBreadcrumbs });
      flatten(link.items, newBreadcrumbs);
    });
  }
  items.forEach((item) => flatten(item.links, [...crumbs, item.title]));

  return flatItems;
}

export default function GuidesLayoutContents({
  children,
  description,
  navigation,
  tableOfContents,
  title,
}: Props) {
  const { pathname } = useI18nPathname();
  const articleContainerRef = useRef<HTMLDivElement>(null);

  const flatNavigationItems = flattenNavigationItems(navigation);

  const currentItem = flatNavigationItems.filter(
    (item) => item.href === pathname,
  )[0];

  return (
    <>
      <ArticleJsonLd
        authorName={[
          {
            name: 'GreatFrontEnd',
            url: 'https://twitter.com/greatfrontend',
          },
        ]}
        datePublished="2022-11-01T08:00:00+08:00"
        description={description}
        images={[]}
        isAccessibleForFree={true}
        title={title}
        url={`https://www.greatfrontend.com${pathname}`}
        useAppDir={true}
      />
      <GuidesHeadingObserver
        articleContainerRef={articleContainerRef}
        headingSelectors={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}>
        <div className="flex w-0 grow">
          <div className="mx-auto w-full max-w-xl space-y-6 px-4 py-12 sm:max-w-3xl sm:px-10 md:max-w-4xl 2xl:max-w-5xl">
            {currentItem && (
              <div className="-mb-4 flex flex-wrap gap-x-2 text-sm text-slate-500">
                {currentItem.breadcrumbs.map((breadcrumb, index) => (
                  <Fragment key={breadcrumb}>
                    {index > 0 && <span>/</span>}
                    <span>{breadcrumb}</span>
                  </Fragment>
                ))}
              </div>
            )}
            <Prose textSize="xl">
              <div ref={articleContainerRef}>
                <h1>{title}</h1>
                <Abstract>{description}</Abstract>
                {children}
              </div>
            </Prose>
            <Section>
              <QuestionPagination
                currentHref={pathname ?? ''}
                items={flatNavigationItems}
              />
            </Section>
          </div>
          {tableOfContents && (
            <Section>
              <div
                key={currentItem?.href}
                className="hidden xl:sticky xl:block xl:flex-none xl:overflow-y-auto xl:overflow-x-hidden xl:py-12 xl:px-6"
                style={{
                  height: `calc(100vh - var(--navbar-height))`,
                  top: `var(--navbar-height)`,
                }}>
                <GuidesTableOfContents tableOfContents={tableOfContents} />
              </div>
            </Section>
          )}
        </div>
      </GuidesHeadingObserver>
    </>
  );
}
