'use client';

import clsx from 'clsx';

import useScrollToTop from '~/hooks/useScrollToTop';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import SidebarCollapser from '~/components/common/SidebarCollapser';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeDivideColor,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  children: React.ReactNode;
  questionList: ReadonlyArray<QuestionMetadata>;
}>;

export default function QuestionsQuizContentLayout({
  children,
  questionList,
}: Props) {
  const { showSidebar } = useUserPreferences();
  const { pathname } = useI18nPathname();

  useScrollToTop([pathname]);

  return (
    <div className="flex w-full">
      <div
        className="sticky flex"
        style={{
          height: FooterlessContainerHeight,
          top: `var(--nav-top-offset)`,
        }}>
        {showSidebar && (
          <Section>
            <nav className="hidden w-[270px] overflow-y-auto text-base lg:block lg:text-sm 2xl:w-96">
              {/* Questions list */}
              <aside className="relative h-full lg:flex-shrink-0 xl:order-first">
                <div
                  className={clsx(
                    'relative flex h-full flex-col border-r',
                    themeBorderColor,
                    !showSidebar && 'hidden',
                  )}>
                  <Heading className="sr-only" level="custom">
                    {/* TODO: i18n */}
                    Quiz Questions
                  </Heading>
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <ul
                      className={clsx('divide-y px-4', themeDivideColor)}
                      role="list">
                      {questionList.map(({ slug, href, title: titleParam }) => (
                        <li
                          key={slug}
                          className={clsx(
                            'relative flex items-center py-5',
                            pathname === href && themeTextBrandColor,
                            themeTextBrandColor_Hover,
                          )}>
                          <div className="flex justify-between space-x-3">
                            <div className="min-w-0 flex-1">
                              <Anchor
                                className={clsx(
                                  'block',
                                  'focus-visible:ring-brand-dark dark:focus-visible:ring-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-inset',
                                )}
                                href={href}
                                variant="unstyled">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                <Text
                                  color="inherit"
                                  display="block"
                                  size="body2">
                                  {titleParam}
                                </Text>
                              </Anchor>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </nav>
          </Section>
        )}
        <SidebarCollapser />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
