'use client';

import clsx from 'clsx';

import useScrollToTop from '~/hooks/useScrollToTop';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionsSidebarCollapser from '~/components/questions/common/QuestionsSidebarCollapser';
import {
  ReadyQuestions,
  useSystemDesignNavigation,
} from '~/components/questions/content/system-design/SystemDesignNavigation';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nPathname } from '~/next-i18nostic/src';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/24/solid';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SystemDesignLayoutSidebar({ children }: Props) {
  const { showSidebar } = useUserPreferences();
  const { pathname } = useI18nPathname();
  const { userProfile } = useUserProfile();
  const isPremiumUser = userProfile?.isPremium ?? false;
  const { title, items: systemDesignNavigation } = useSystemDesignNavigation();

  useScrollToTop([pathname]);

  return (
    <div className="flex w-full">
      <Section>
        <div
          className="sticky hidden lg:flex"
          style={{
            height: FooterlessContainerHeight,
            top: `var(--navbar-height)`,
          }}>
          {showSidebar && (
            <div className="flex w-72 flex-col gap-y-8 overflow-y-auto border-r border-r-slate-200 p-6 text-xs xl:w-[300px] 2xl:w-96">
              <Heading className="mt-4 text-base font-semibold text-slate-700">
                {title}
              </Heading>
              <Section>
                <nav>
                  <ul className="flex flex-col gap-y-6" role="list">
                    {systemDesignNavigation.map((section) => (
                      <li key={section.title}>
                        <Heading className="text-[0.8125rem] font-semibold leading-6 text-zinc-900">
                          {section.title}
                        </Heading>
                        <Section>
                          <div className="pl-2">
                            <ul
                              className="mt-3 flex flex-col gap-y-2 border-l border-slate-200"
                              role="list">
                              {section.links.map((link) => (
                                <li
                                  key={link.href}
                                  className="relative text-sm leading-6">
                                  <Anchor
                                    className={clsx(
                                      'flex w-full items-center gap-x-2 pl-4',
                                      pathname === link.href
                                        ? 'text-brand-500'
                                        : 'text-zinc-500 hover:text-zinc-800',
                                    )}
                                    href={link.href}
                                    variant="unstyled">
                                    <span>{link.title}</span>
                                    {(() => {
                                      if (!isPremiumUser) {
                                        if (link.premium) {
                                          return (
                                            <LockClosedIcon className="h-4 w-4 shrink-0" />
                                          );
                                        }
                                      }
                                      if (
                                        link.type === 'question' &&
                                        !ReadyQuestions.includes(link.slug)
                                      ) {
                                        return (
                                          <ExclamationTriangleIcon className="h-4 w-4 shrink-0" />
                                        );
                                      }

                                      return null;
                                    })()}
                                  </Anchor>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Section>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Section>
            </div>
          )}
          <QuestionsSidebarCollapser />
        </div>
      </Section>
      {children}
    </div>
  );
}
