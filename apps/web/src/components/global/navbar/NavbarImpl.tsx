'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useIntl } from 'react-intl';

import * as gtag from '~/lib/gtag';

import { useGuidesData } from '~/data/Guides';
import { usePreparationPlansUI } from '~/data/PreparationPlansUI';
import {
  useQuestionCategoryLists,
  useQuestionFormatLists,
} from '~/data/QuestionFormats';

import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Navbar from '~/components/ui/Navbar/Navbar';
import type {
  NavbarPrimaryItem,
  NavLinkItem,
} from '~/components/ui/Navbar/NavTypes';

import NavProfileIcon from './NavProfileIcon';
import LogoLink from '../Logo';
import { useUserProfile } from '../UserProfileProvider';

import { PlayIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useUser } from '@supabase/auth-helpers-react';

function useNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarPrimaryItem> {
  const intl = useIntl();
  const questionCategoryLists = useQuestionCategoryLists();
  const questionFormatLists = useQuestionFormatLists();
  const preparationPlansExtra = usePreparationPlansUI();
  const guides = useGuidesData();
  // To redirect post-login, so we can use the full pathname.
  const pathname = usePathname();

  const links: ReadonlyArray<NavbarPrimaryItem | null> = [
    // {
    //   type: 'link',
    //   key: 'ui',
    //   label: 'UI Library',
    //   href: '/dev__/ui',
    //   mode: 'dev-only',
    //   position: 'end',
    // },
    // {
    //   type: 'link',
    //   key: 'prose',
    //   label: 'Prose',
    //   href: '/dev__/prose',
    //   mode: 'dev-only',
    //   position: 'end',
    // },
    isLoggedIn
      ? {
          href: '/prepare',
          key: 'dashboard',
          // TODO: i18n
          label: 'Dashboard',
          onClick: () => {
            gtag.event({
              action: `nav.dashboard.click`,
              category: 'engagement',
              label: 'Dashboard',
            });
          },
          position: 'start',
          type: 'link',
        }
      : {
          href: '/',
          key: 'features',
          label: 'Features',
          onClick: () => {
            gtag.event({
              action: `nav.features.click`,
              category: 'engagement',
              label: 'Features',
            });
          },
          position: 'start',
          type: 'link',
        },
    {
      items: [
        {
          alignment: 'top',
          items: [
            {
              href: questionFormatLists.coding.href,
              icon: questionFormatLists.coding.icon,
              key: questionFormatLists.coding.key,
              label: `${questionFormatLists.coding.name} Questions`,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.questions.coding.click`,
                  category: 'engagement',
                  label: 'Coding Questions',
                });
              },
              sublabel: questionFormatLists.coding.description,
              type: 'popover-link',
            },
            {
              href: questionFormatLists['system-design'].href,
              icon: questionFormatLists['system-design'].icon,
              key: questionFormatLists['system-design'].key,
              label: `${questionFormatLists['system-design'].name} Questions`,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.questions.system_design.click`,
                  category: 'engagement',
                  label: 'System Design Questions',
                });
              },
              sublabel: questionFormatLists['system-design'].description,
              type: 'popover-link',
            },
            {
              href: questionFormatLists.quiz.href,
              icon: questionFormatLists.quiz.icon,
              key: questionFormatLists.quiz.key,
              label: `${questionFormatLists.quiz.name} Questions`,
              labelAddon: (
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Free',
                    description: 'Free-of-charge label',
                    id: 'S+6OOS',
                  })}
                  size="sm"
                  variant="success"
                />
              ),
              onClick: () => {
                gtag.event({
                  action: `nav.practice.questions.quiz.click`,
                  category: 'engagement',
                  label: 'Quiz Questions',
                });
              },
              sublabel: questionFormatLists.quiz.description,
              type: 'popover-link',
            },
          ],
          key: 'questions-types',
          label: 'Prepare end-to-end for front end interviews',
          supplementaryItem: {
            href: questionFormatLists.coding.href,
            icon: PlayIcon,
            key: questionFormatLists.coding.key,
            label: 'Practice end-to-end',
            type: 'link',
          },
          type: 'popover-list',
        },
        {
          alignment: 'center',
          items: [
            {
              href: questionCategoryLists.javascript.href,
              icon: questionCategoryLists.javascript.icon,
              key: questionCategoryLists.javascript.key,
              label: `${questionCategoryLists.javascript.name} Questions`,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.topic.javascript.click`,
                  category: 'engagement',
                  label: 'JavaScript Questions',
                });
              },
              type: 'popover-link',
            },
            {
              href: questionCategoryLists.html.href,
              icon: questionCategoryLists.html.icon,
              key: questionCategoryLists.html.key,
              label: `${questionCategoryLists.html.name} Questions`,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.topic.html.click`,
                  category: 'engagement',
                  label: 'HTML Questions',
                });
              },
              type: 'popover-link',
            },
            {
              href: questionCategoryLists.css.href,
              icon: questionCategoryLists.css.icon,
              key: questionCategoryLists.css.key,
              label: `${questionCategoryLists.css.name} Questions`,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.topic.css.click`,
                  category: 'engagement',
                  label: 'CSS Questions',
                });
              },
              type: 'popover-link',
            },
            {
              href: questionCategoryLists.react.href,
              icon: questionCategoryLists.react.icon,
              key: questionCategoryLists.react.key,
              label: `${questionCategoryLists.react.name} Questions`,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.topic.react.click`,
                  category: 'engagement',
                  label: 'React Questions',
                });
              },
              type: 'popover-link',
            },
            {
              icon: questionCategoryLists.angular.icon,
              key: questionCategoryLists.angular.key,
              label: questionCategoryLists.angular.name,
              labelAddon: (
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Coming Soon',
                    description:
                      'Coming soon label indicating that a feature will be launched soon',
                    id: 'jIpXy+',
                  })}
                  size="sm"
                  variant="warning"
                />
              ),
              onClick: () => {
                gtag.event({
                  action: `nav.practice.topic.angular.click`,
                  category: 'engagement',
                  label: 'Angular',
                });
              },
              type: 'popover-link',
            },
            {
              icon: questionCategoryLists.vue.icon,
              key: questionCategoryLists.vue.key,
              label: questionCategoryLists.vue.name,
              labelAddon: (
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Coming Soon',
                    description:
                      'Coming soon label indicating that a feature will be launched soon',
                    id: 'jIpXy+',
                  })}
                  size="sm"
                  variant="warning"
                />
              ),
              onClick: () => {
                gtag.event({
                  action: `nav.practice.topic.vue.click`,
                  category: 'engagement',
                  label: 'Vue',
                });
              },
              type: 'popover-link',
            },
          ],
          key: 'language-framework',
          label: 'Practice questions by framework or language',
          type: 'popover-list',
        },
        {
          items: [
            {
              href: preparationPlansExtra['one-week'].href,
              icon: preparationPlansExtra['one-week'].iconOutline,
              key: preparationPlansExtra['one-week'].type,
              label: preparationPlansExtra['one-week'].name + ' Plan',
              onClick: () => {
                gtag.event({
                  action: `nav.practice.plans.one_week.click`,
                  category: 'engagement',
                  label: '1 Week Plan',
                });
              },
              sublabel: preparationPlansExtra['one-week'].shortDescription,
              type: 'popover-link',
            },
            {
              href: preparationPlansExtra['one-month'].href,
              icon: preparationPlansExtra['one-month'].iconOutline,
              key: preparationPlansExtra['one-month'].type,
              label: preparationPlansExtra['one-month'].name + ' Plan',
              onClick: () => {
                gtag.event({
                  action: `nav.practice.plans.one_month.click`,
                  category: 'engagement',
                  label: '1 Month Plan',
                });
              },
              sublabel: preparationPlansExtra['one-month'].shortDescription,
              type: 'popover-link',
            },
            {
              href: preparationPlansExtra['three-months'].href,
              icon: preparationPlansExtra['three-months'].iconOutline,
              key: preparationPlansExtra['three-months'].type,
              label: preparationPlansExtra['three-months'].name + ' Plan',
              onClick: () => {
                gtag.event({
                  action: `nav.practice.plans.three_months.click`,
                  category: 'engagement',
                  label: '3 Months Plan',
                });
              },
              sublabel: preparationPlansExtra['three-months'].shortDescription,
              type: 'popover-link',
            },
          ],
          key: 'study-plans',
          label: 'Practice with study plans and timelines',
          type: 'popover-list',
        },
      ],
      key: 'practice-questions',
      label: 'Practice Questions',
      position: 'start',
      type: 'popover-tabs',
    },
    {
      items: [
        {
          items: [
            {
              href: guides['front-end-interview-guidebook'].href,
              icon: guides['front-end-interview-guidebook'].icon,
              key: guides['front-end-interview-guidebook'].key,
              label: guides['front-end-interview-guidebook'].name,
              labelAddon: (
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Free',
                    description: 'Free-of-charge label',
                    id: 'S+6OOS',
                  })}
                  size="sm"
                  variant="success"
                />
              ),
              onClick: () => {
                gtag.event({
                  action: `nav.guides.feig.click`,
                  category: 'engagement',
                  label: 'Front End Interview Guidebook',
                });
              },
              sublabel: guides['front-end-interview-guidebook'].description,
              type: 'popover-link',
            },
            {
              href: guides['front-end-system-design-guidebook'].href,
              icon: guides['front-end-system-design-guidebook'].icon,
              key: guides['front-end-system-design-guidebook'].key,
              label: guides['front-end-system-design-guidebook'].name,
              onClick: () => {
                gtag.event({
                  action: `nav.guides.fesdg.click`,
                  category: 'engagement',
                  label: 'Front End System Design Guidebook',
                });
              },
              sublabel: guides['front-end-system-design-guidebook'].description,
              type: 'popover-link',
            },
            {
              href: guides['behavioral-interview-guidebook'].href,
              icon: guides['behavioral-interview-guidebook'].icon,
              key: guides['behavioral-interview-guidebook'].key,
              label: guides['behavioral-interview-guidebook'].name,
              labelAddon: (
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Free',
                    description: 'Free-of-charge label',
                    id: 'S+6OOS',
                  })}
                  size="sm"
                  variant="success"
                />
              ),
              onClick: () => {
                gtag.event({
                  action: `nav.guides.big.click`,
                  category: 'engagement',
                  label: 'Behavioral Interview Guidebook',
                });
              },
              sublabel: guides['behavioral-interview-guidebook'].description,
              type: 'popover-link',
            },
          ],
          key: 'guidebooks',
          label: 'Guidebooks',
          type: 'popover-list',
        },
      ],
      key: 'guides',
      label: 'Guides',
      onClick: () => {
        gtag.event({
          action: `nav.guides.click`,
          category: 'engagement',
          label: 'Guides',
        });
      },
      position: 'start',
      type: 'popover',
    },
    !isPremium
      ? {
          href: '/pricing',
          key: 'pricing',
          label: 'Pricing',
          onClick: () => {
            gtag.event({
              action: `nav.pricing.click`,
              category: 'ecommerce',
              label: 'Pricing',
            });
          },
          position: 'end',
          type: 'link',
        }
      : null,
    !isLoggedIn
      ? {
          href: `/login?next=${encodeURIComponent(
            pathname ?? window.location.pathname,
          )}`,
          key: 'login',
          label: 'Sign In / Up',
          onClick: () => {
            gtag.event({
              action: `nav.sign_in.click`,
              category: 'engagement',
              label: 'Sign In',
            });
          },
          position: 'end',
          type: 'link',
        }
      : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarPrimaryItem>;
}

function useUserNavigationLinks() {
  const userNavigation: ReadonlyArray<NavLinkItem> = [
    {
      href: '/profile',
      key: 'login',
      label: 'Profile',
      onClick: () => {
        gtag.event({
          action: `nav.profile.click`,
          category: 'engagement',
          label: 'Profile',
        });
      },
      type: 'link',
    },
    {
      href: `/logout?next=${encodeURIComponent(
        typeof window !== 'undefined' ? window.location.pathname : '',
      )}`,
      key: 'logout',
      label: 'Sign Out',
      onClick: () => {
        gtag.event({
          action: `nav.sign_out.click`,
          category: 'engagement',
          label: 'Sign Out',
        });
      },
      type: 'link',
    },
  ];

  return userNavigation;
}

// Will need this in future.
// function SearchButton() {
//   return (
//     <button
//       type="button"
//       className="bg-slate-50 flex-shrink-0 rounded-full p-1 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-brand-500">
//       <span className="sr-only">Search website</span>
//       <SearchIcon className="h-6 w-6" aria-hidden="true" />
//     </button>
//   );
// }
export default function NavbarImpl() {
  const user = useUser();
  const { userProfile } = useUserProfile();
  const intl = useIntl();
  const isLoggedIn = user != null;
  const isPremium = userProfile?.isPremium ?? false;
  const links = useNavLinks(isLoggedIn, isPremium);
  const userNavigationLinks = useUserNavigationLinks();

  const endAddOnItems = (
    <>
      {/* <SearchButton /> */}
      {!isPremium && (
        <Button
          href="/pricing"
          label={intl.formatMessage({
            defaultMessage: 'Get Full Access',
            description:
              'Get full access button on the top right corner of the navigation bar to allow users to start evaluating plans and make a purchase',
            id: 'PFRVpF',
          })}
          size="sm"
          variant="special"
          onClick={() => {
            gtag.event({
              action: `nav.get_full_access.click`,
              category: 'ecommerce',
              label: 'Get Full Access',
            });
          }}
        />
      )}
      {isLoggedIn && (
        <NavProfileIcon
          email={user?.email}
          navItems={userNavigationLinks}
          thumbnailUrl={user?.user_metadata?.avatar_url}
        />
      )}
    </>
  );

  function renderMobileSidebarAddOnItems({
    closeMobileNav,
  }: Readonly<{
    closeMobileNav: () => void;
  }>) {
    return (
      <>
        {isLoggedIn && (
          <div className="space-y-1 px-2">
            {userNavigationLinks.map((props) => (
              <Anchor
                key={props.key}
                className={clsx(
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                )}
                href={props.href}
                variant="unstyled"
                onClick={(event) => {
                  props.onClick?.(event);
                  closeMobileNav();
                }}>
                {props.label}
              </Anchor>
            ))}
          </div>
        )}
        {!isPremium && (
          <div className="mt-4 px-4">
            <Anchor
              className="inline-flex w-full justify-center rounded-lg bg-slate-900 py-2 px-3 text-sm font-semibold text-white hover:bg-slate-700"
              href="/pricing"
              variant="unstyled"
              onClick={() => {
                closeMobileNav();
                gtag.event({
                  action: `nav.get_full_access.click`,
                  category: 'ecommerce',
                  label: 'Get Full Access',
                });
              }}>
              <span>
                Get full access <span aria-hidden="true">→</span>
              </span>
            </Anchor>
          </div>
        )}
      </>
    );
  }

  const mobileSidebarBottomItems = isLoggedIn && (
    <div className="group block flex-shrink-0">
      <div className="flex items-center">
        <div>
          {user?.user_metadata?.avatar_url ? (
            <img
              alt=""
              className="inline-block h-8 w-8 rounded-full"
              src={user?.user_metadata?.avatar_url}
            />
          ) : (
            <UserCircleIcon className="h-8 w-8 text-slate-500" />
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
            {user?.user_metadata?.name ?? user?.email}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Navbar
      endAddOnItems={endAddOnItems}
      links={links}
      logo={<LogoLink />}
      mobileSidebarBottomItems={mobileSidebarBottomItems}
      renderMobileSidebarAddOnItems={renderMobileSidebarAddOnItems}
    />
  );
}
