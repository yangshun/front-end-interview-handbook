'use client';

import clsx from 'clsx';
import { RiErrorWarningLine, RiLockLine } from 'react-icons/ri';

import useScrollToTop from '~/hooks/useScrollToTop';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import SidebarCollapser from '~/components/common/SidebarCollapser';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import GuidesDropdownMenu from '~/components/guides/GuidesDropdownMenu';
import { ReadyQuestions } from '~/components/questions/content/system-design/SystemDesignConfig';
import { useSystemDesignNavigation } from '~/components/questions/content/system-design/SystemDesignNavigation';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import {
  themeLineColor,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

export default function SystemDesignSidebar() {
  const { items: systemDesignNavigation } = useSystemDesignNavigation();
  const { pathname } = useI18nPathname();
  const { userProfile } = useUserProfile();
  const isPremiumUser = userProfile?.isPremium ?? false;

  return (
    <div
      className={clsx(
        'w-[280px] overflow-y-auto border-r p-6 text-xs',
        themeLineColor,
      )}>
      <GuidesDropdownMenu />
      <nav>
        <ul className="mt-6 flex flex-col gap-y-6" role="list">
          {systemDesignNavigation.map((section) => (
            <li key={section.title}>
              <Heading
                className="text-[0.8125rem] font-semibold leading-6"
                level="custom">
                {section.title}
              </Heading>
              <Section>
                <div className="pl-2">
                  <ul
                    className={clsx(
                      'mt-3 flex flex-col gap-y-2 border-l',
                      themeLineColor,
                    )}
                    role="list">
                    {section.links.map((link) => (
                      <li
                        key={link.href}
                        className="relative text-sm leading-6">
                        <Anchor
                          className={clsx(
                            '-ml-px flex w-full items-center justify-between gap-x-2 border-l pl-4',
                            pathname === link.href
                              ? clsx(
                                  themeTextBrandColor,
                                  'border-current font-semibold',
                                )
                              : clsx(
                                  themeTextSecondaryColor,
                                  'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                                ),
                          )}
                          href={link.href}
                          variant="unstyled">
                          <span>{link.title}</span>
                          {(() => {
                            if (!isPremiumUser) {
                              if (link.premium) {
                                return (
                                  <RiLockLine className="h-4 w-4 shrink-0" />
                                );
                              }
                            }
                            if (
                              link.type === 'question' &&
                              !ReadyQuestions.includes(link.slug)
                            ) {
                              return (
                                <RiErrorWarningLine className="h-4 w-4 shrink-0" />
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
    </div>
  );
}
