'use client';

import clsx from 'clsx';

import useScrollToTop from '~/hooks/useScrollToTop';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import QuestionsSidebarCollapser from '~/components/questions/common/QuestionsSidebarCollapser';
import type { QuestionQuizMetadata } from '~/components/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBackgroundEmphasizedHover,
  themeDivideColor,
  themeLineColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  children: React.ReactNode;
  questionList: ReadonlyArray<QuestionQuizMetadata>;
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
          top: `var(--navbar-height)`,
        }}>
        {showSidebar && (
          <Section>
            <nav className="hidden w-[270px] overflow-y-auto text-base lg:block lg:text-sm 2xl:w-96">
              {/* Questions list */}
              <aside className="relative h-full lg:flex-shrink-0 xl:order-first">
                <div
                  className={clsx(
                    'relative flex h-full flex-col border-r',
                    themeLineColor,
                    !showSidebar && 'hidden',
                  )}>
                  <Heading className="sr-only" level="custom">
                    {/* TODO: i18n */}
                    Quiz Questions
                  </Heading>
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <ul
                      className={clsx(
                        'divide-y border-b',
                        themeLineColor,
                        themeDivideColor,
                      )}
                      role="list">
                      {questionList.map(({ slug, href, title: titleParam }) => (
                        <li
                          key={slug}
                          className={clsx(
                            'focus-within:ring-brand-dark relative flex h-[80px] items-center py-5 px-6 focus-within:ring-2 focus-within:ring-inset 2xl:h-[90px]',
                            pathname === href
                              ? themeBackgroundEmphasized
                              : themeBackgroundEmphasizedHover,
                          )}>
                          <div className="flex justify-between space-x-3">
                            <div className="min-w-0 flex-1">
                              <Anchor
                                className="block focus:outline-none"
                                href={href}
                                variant="unstyled">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                <Text
                                  className={clsx('line-clamp-2')}
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
        <QuestionsSidebarCollapser />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
