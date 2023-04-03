'use client';

import clsx from 'clsx';

import useScrollToTop from '~/hooks/useScrollToTop';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import QuestionsSidebarCollapser from '~/components/questions/common/QuestionsSidebarCollapser';
import type { QuestionQuizMetadata } from '~/components/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

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
          height: `calc(100dvh - var(--navbar-height))`,
          top: `var(--navbar-height)`,
        }}>
        {showSidebar && (
          <Section>
            <nav className="hidden w-[270px] overflow-y-auto text-base lg:block lg:text-sm 2xl:w-96">
              {/* Questions list */}
              <aside className="relative h-full lg:flex-shrink-0 xl:order-first">
                <div
                  className={clsx(
                    'relative flex h-full flex-col border-r border-slate-200',
                    !showSidebar && 'hidden',
                  )}>
                  <Heading className="sr-only">Quiz Questions</Heading>
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <ul
                      className="divide-y divide-slate-200 border-b border-slate-200"
                      role="list">
                      {questionList.map(({ slug, href, title: titleParam }) => (
                        <li
                          key={slug}
                          className={clsx(
                            'focus-within:ring-brand-600 relative flex h-[80px] items-center py-5 px-6 focus-within:ring-2 focus-within:ring-inset hover:bg-slate-50 2xl:h-[90px]',
                            pathname === href ? '!bg-slate-100' : 'bg-white',
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
                                <p
                                  className={clsx(
                                    'font-lightnormal line-clamp-2 text-sm',
                                  )}>
                                  {titleParam}
                                </p>
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
