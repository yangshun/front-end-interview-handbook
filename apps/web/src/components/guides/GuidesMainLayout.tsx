'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import useScrollToTop from '~/hooks/useScrollToTop';

import ArticlePagination from '~/components/common/ArticlePagination';
import { useIntl } from '~/components/intl';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import type { GuideProgress } from '~/db/guides/GuideProgressTypes';
import { useMutationGuideProgressAdd } from '~/db/guides/GuidesProgressClient';
import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import { useGuidesContext } from './GuidesLayout';
import GuidesNavbar from './GuidesNavbar';
import GuidesProgressAction from './GuidesProgressAction';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import type { GuideMetadata, GuideNavigation } from './types';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';
import { useGuidesAutoMarkAsComplete } from './useGuidesAutoMarkAsComplete';
import { useToast } from '../global/toasts/useToast';

type MarkAsCompleteProps = Readonly<
  | {
      guideProgress?: GuideProgress | null;
      isGuideProgressLoaded: boolean;
      metadata: GuideMetadata;
      showMarkAsComplete?: true;
    }
  | {
      metadata?: GuideMetadata;
      showMarkAsComplete?: false;
    }
>;

type Props = Readonly<
  MarkAsCompleteProps & {
    children?: React.ReactNode;
    isAccessibleForFree?: boolean;
    navigation: GuideNavigation;
    tableOfContents?: TableOfContents;
  }
>;

export default function GuidesMainLayout({
  children,
  navigation,
  tableOfContents,
  showMarkAsComplete = false,
  metadata,
  ...props
}: Props) {
  const intl = useIntl();
  const { pathname } = useI18nPathname();
  const { collapsedToC, setCollapsedToC } = useGuidesContext();
  const articleContainerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useScrollToTop([pathname]);

  const addGuideProgressMutation = useMutationGuideProgressAdd();
  const [autoMarkAsComplete, setAutoMarkAsComplete] =
    useGuidesAutoMarkAsComplete();

  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  for (let i = 0; i < flatNavigationItems.length; i++) {
    if (
      flatNavigationItems[i]?.href !== pathname &&
      flatNavigationItems[i].slug !== pathname
    ) {
      continue;
    }
    break;
  }

  return (
    <GuidesHeadingObserver
      articleContainerRef={articleContainerRef}
      headingSelectors={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}>
      <div className="w-full">
        <GuidesNavbar
          navigation={navigation}
          tableOfContents={tableOfContents}
        />
        <div
          className={clsx(
            'flex w-full grow gap-12',
            'px-4 pb-20 pt-12 md:px-6 lg:px-8 xl:pl-12 xl:pr-6',
          )}>
          <div
            className={clsx(
              'flex flex-col gap-12',
              'mx-auto w-full max-w-[620px]',
            )}>
            <div ref={articleContainerRef}>{children}</div>
            <Section>
              {showMarkAsComplete && metadata && (
                <>
                  <div
                    className={clsx(
                      'flex justify-end',
                      'transition-colors',
                      'isGuideProgressLoaded' in props &&
                        props.isGuideProgressLoaded
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}>
                    <div className="max-w-64 flex flex-col items-end gap-2">
                      <GuidesProgressAction
                        guideName={currentItem.title}
                        guideProgress={
                          'guideProgress' in props ? props.guideProgress : null
                        }
                        metadata={metadata}
                      />
                      <CheckboxInput
                        label={intl.formatMessage({
                          defaultMessage:
                            'Automatically mark as complete when moving to the next article',
                          description: 'Mark article as complete automatically',
                          id: 'tdR9Fm',
                        })}
                        size="sm"
                        value={autoMarkAsComplete}
                        onChange={(value) => {
                          setAutoMarkAsComplete(value);
                        }}
                      />
                    </div>
                  </div>
                  <Divider />
                </>
              )}
              <ArticlePagination
                activeItem={pathname ?? ''}
                items={flatNavigationItems}
                onNext={() => {
                  if (
                    !autoMarkAsComplete ||
                    metadata == null ||
                    ('guideProgress' in props &&
                      props.guideProgress?.status === 'complete')
                  ) {
                    return;
                  }

                  const listKey =
                    new URL(window.location.href).searchParams.get('list') ??
                    undefined;

                  addGuideProgressMutation.mutate(
                    {
                      category: metadata.category,
                      listKey,
                      progressId:
                        'guideProgress' in props
                          ? props.guideProgress?.id
                          : undefined,
                      slug: metadata.slug,
                      status: 'complete',
                    },
                    {
                      onError: () => {
                        showToast({
                          title: intl.formatMessage({
                            defaultMessage:
                              'Failed to mark article as complete. Please try again',
                            description:
                              'Error message shown when a guide has failed to mark as complete',
                            id: '6eVVTu',
                          }),
                          variant: 'danger',
                        });
                      },
                      onSuccess: () => {
                        showToast({
                          title: intl.formatMessage(
                            {
                              defaultMessage:
                                'Marked "{articleName}" as complete',
                              description:
                                'Success message shown when an article was marked as complete',
                              id: 'piDflv',
                            },
                            {
                              articleName: currentItem.title,
                            },
                          ),
                          variant: 'success',
                        });
                      },
                    },
                  );
                }}
              />
            </Section>
          </div>
          {tableOfContents && (
            <Section>
              <aside
                key={currentItem?.href}
                className={clsx(
                  'hidden overflow-hidden xl:sticky xl:block xl:flex-none xl:overflow-x-hidden',
                  collapsedToC ? 'lg:w-[252px]' : 'w-[252px]',
                )}
                style={{
                  height: 'calc(100vh - 48px - var(--global-sticky-height))',
                  top: 'calc(48px + var(--global-sticky-height))',
                }}>
                <GuidesTableOfContents
                  collapsed={collapsedToC}
                  isCollapsible={true}
                  setCollapsedToC={setCollapsedToC}
                  tableOfContents={tableOfContents}
                />
              </aside>
            </Section>
          )}
        </div>
      </div>
    </GuidesHeadingObserver>
  );
}
