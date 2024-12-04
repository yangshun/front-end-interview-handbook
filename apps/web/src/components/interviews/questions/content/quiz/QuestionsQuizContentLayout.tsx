'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import useScrollToTop from '~/hooks/useScrollToTop';

import SidebarCollapser from '~/components/global/sidebar/SidebarCollapser';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeDivideColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
} from '~/components/ui/theme';

type Props = Readonly<{
  children: React.ReactNode;
  questionList: ReadonlyArray<QuestionMetadata>;
}>;

export default function QuestionsQuizContentLayout({
  children,
  questionList,
}: Props) {
  const { showSidebar } = useUserPreferences();
  const pathname = usePathname();

  useScrollToTop([pathname]);

  return (
    <div className="flex w-full">
      <div
        className={clsx(
          'flex',
          'sticky top-[var(--global-sticky-height)] h-[calc(100vh_-_var(--global-sticky-height))]',
        )}>
        {showSidebar && (
          <Section>
            <nav className="hidden w-[270px] overflow-y-auto text-base lg:block lg:text-sm 2xl:w-96">
              {/* Questions list */}
              <aside className="relative h-full lg:shrink-0 xl:order-first">
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
                                className={clsx('block', [
                                  themeOutlineElement_FocusVisible,
                                  themeOutlineElementBrandColor_FocusVisible,
                                ])}
                                href={href}
                                variant="unstyled">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                <Text
                                  className="block"
                                  color="inherit"
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
