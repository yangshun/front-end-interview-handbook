'use client';

import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

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
  const { items: systemDesignNavigation } = useSystemDesignNavigation();

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
            <div className="flex w-72 flex-col gap-y-8 overflow-y-auto bg-slate-50 p-6 text-sm xl:w-[300px] 2xl:w-96">
              <Heading className="text-base font-medium text-slate-700">
                <FormattedMessage
                  defaultMessage="Front End System Design Guidebook"
                  description="Header for front end system design guidebook on the system design sidebar"
                  id="cuNbpf"
                />
              </Heading>
              <Section>
                <nav>
                  <ul className="space-y-8" role="list">
                    {systemDesignNavigation.map((section) => (
                      <li key={section.title}>
                        <Heading className="font-medium text-slate-900">
                          {section.title}
                        </Heading>
                        <Section>
                          <ul
                            className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200"
                            role="list">
                            {section.links.map((link) => (
                              <li key={link.href} className="relative">
                                <Anchor
                                  className={clsx(
                                    'flex w-full items-center space-x-2 pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                                    pathname === link.href
                                      ? 'text-brand-500 before:bg-brand-500'
                                      : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block',
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
