'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import { useGuidesData } from '~/data/Guides';
import { usePreparationPlansUI } from '~/data/PreparationPlansUI';
import {
  useQuestionCategoryLists,
  useQuestionFormatLists,
} from '~/data/QuestionFormats';

import I18nSelect from '~/components/i18n/I18nSelect';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Navbar from '~/components/ui/Navbar/Navbar';
import type {
  NavbarPrimaryItem,
  NavLinkItem,
} from '~/components/ui/Navbar/NavTypes';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import NavLocaleDropdown from './NavLocaleDropdown';
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
    //   itemKey: 'ui',
    //   label: 'UI Library',
    //   href: '/dev__/ui',
    //   mode: 'dev-only',
    //   position: 'end',
    // },
    // {
    //   type: 'link',
    //   itemKey: 'prose',
    //   label: 'Prose',
    //   href: '/dev__/prose',
    //   mode: 'dev-only',
    //   position: 'end',
    // },
    isLoggedIn
      ? {
          href: '/prepare',
          itemKey: 'dashboard',
          label: intl.formatMessage({
            defaultMessage: 'Dashboard',
            description: 'Link to dashboard page',
            id: 'vi10y1',
          }),
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
          itemKey: 'features',
          label: intl.formatMessage({
            defaultMessage: 'Features',
            description: 'Link to features page',
            id: 'xEvm93',
          }),
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
      itemKey: 'practice-questions',
      items: [
        {
          alignment: 'top',
          itemKey: 'questions-types',
          items: [
            {
              href: questionFormatLists.coding.href,
              icon: questionFormatLists.coding.icon,
              itemKey: questionFormatLists.coding.key,
              label: questionFormatLists.coding.longName,
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
              itemKey: questionFormatLists['system-design'].key,
              label: questionFormatLists['system-design'].longName,
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
              itemKey: questionFormatLists.quiz.key,
              label: questionFormatLists.quiz.longName,
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
          label: intl.formatMessage({
            defaultMessage: 'Prepare end-to-end for front end interviews',
            description: 'Title for question format category links in navbar',
            id: 'mOk1w0',
          }),
          supplementaryItem: {
            href: questionFormatLists.coding.href,
            icon: PlayIcon,
            itemKey: questionFormatLists.coding.key,
            label: intl.formatMessage({
              defaultMessage: 'Practice end-to-end',
              description: 'Practice questions for all stages',
              id: 'QHtJPS',
            }),
            type: 'link',
          },
          type: 'popover-list',
        },
        {
          alignment: 'center',
          itemKey: 'language-framework',
          items: [
            {
              href: questionCategoryLists.javascript.href,
              icon: questionCategoryLists.javascript.icon,
              itemKey: questionCategoryLists.javascript.key,
              label: questionCategoryLists.javascript.longName,
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
              itemKey: questionCategoryLists.html.key,
              label: questionCategoryLists.html.longName,
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
              itemKey: questionCategoryLists.css.key,
              label: questionCategoryLists.css.longName,
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
              itemKey: questionCategoryLists.react.key,
              label: questionCategoryLists.react.longName,
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
              itemKey: questionCategoryLists.angular.key,
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
              itemKey: questionCategoryLists.vue.key,
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
          label: intl.formatMessage({
            defaultMessage: 'Practice questions by framework or language',
            description:
              'Title for question framework category links in navbar',
            id: '0mKzkX',
          }),
          type: 'popover-list',
        },
        {
          itemKey: 'study-plans',
          items: [
            {
              href: preparationPlansExtra['one-week'].href,
              icon: preparationPlansExtra['one-week'].iconOutline,
              itemKey: preparationPlansExtra['one-week'].type,
              label: preparationPlansExtra['one-week'].longName,
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
              itemKey: preparationPlansExtra['one-month'].type,
              label: preparationPlansExtra['one-month'].longName,
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
              itemKey: preparationPlansExtra['three-months'].type,
              label: preparationPlansExtra['three-months'].longName,
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
          label: intl.formatMessage({
            defaultMessage: 'Practice with study plans and timelines',
            description: 'Section title for study plans',
            id: 'CQOAJS',
          }),
          type: 'popover-list',
        },
      ],
      label: intl.formatMessage({
        defaultMessage: 'Practice Questions',
        description:
          'Section title for links to question lists by category and format',
        id: '6w1Z0V',
      }),
      position: 'start',
      type: 'popover-tabs',
    },
    {
      itemKey: 'guides',
      items: [
        {
          itemKey: 'guidebooks',
          items: [
            {
              href: guides['front-end-interview-guidebook'].href,
              icon: guides['front-end-interview-guidebook'].icon,
              itemKey: guides['front-end-interview-guidebook'].key,
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
              itemKey: guides['front-end-system-design-guidebook'].key,
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
              itemKey: guides['behavioral-interview-guidebook'].key,
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
          label: intl.formatMessage({
            defaultMessage: 'Guidebooks',
            description: 'Guidebooks category',
            id: 'B82jFj',
          }),
          type: 'popover-list',
        },
      ],
      label: intl.formatMessage({
        defaultMessage: 'Guides',
        description: 'Guides navbar item',
        id: 'H/u+cg',
      }),
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
    {
      href: '/hiring',
      itemKey: 'hiring',
      label: intl.formatMessage({
        defaultMessage: "We're Hiring",
        description: 'Link label to the hiring page',
        id: 'xq16Hq',
      }),
      onClick: () => {
        gtag.event({
          action: `nav.hiring.click`,
          category: 'engagement',
          label: "We're Hiring",
        });
      },
      position: 'end',
      type: 'link',
    },
    !isPremium
      ? {
          href: '/pricing',
          itemKey: 'pricing',
          label: intl.formatMessage({
            defaultMessage: 'Pricing',
            description: 'Link label to the pricing page',
            id: 'VlrCm6',
          }),
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
          itemKey: 'login',
          label: intl.formatMessage({
            defaultMessage: 'Sign In / Up',
            description: 'Link label to the sign in / up page',
            id: 'q3MA2w',
          }),
          onClick: () => {
            gtag.event({
              action: `nav.sign_in.click`,
              category: 'engagement',
              label: 'Sign In / Up',
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
  const intl = useIntl();
  const router = useI18nRouter();

  const userNavigation: ReadonlyArray<NavLinkItem> = [
    {
      href: '/profile',
      itemKey: 'login',
      label: intl.formatMessage({
        defaultMessage: 'Profile',
        description: 'Link label to the profile page',
        id: 'BwHkBU',
      }),
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
      href: '#',
      itemKey: 'logout',
      label: intl.formatMessage({
        defaultMessage: 'Sign Out',
        description: 'Link label to the sign out page',
        id: '641P5n',
      }),
      onClick: () => {
        router.push(
          `/logout?next=${encodeURIComponent(
            typeof window !== 'undefined' ? window.location.pathname : '',
          )}`,
        );
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
  const { isUserProfileLoading, userProfile } = useUserProfile();
  const intl = useIntl();
  const isLoggedIn = user != null;
  const isPremium = userProfile?.isPremium ?? false;
  const links = useNavLinks(isLoggedIn, isPremium);
  const userNavigationLinks = useUserNavigationLinks();
  const { locale, pathname } = useI18nPathname();
  const router = useI18nRouter();

  const endAddOnItems = (
    <>
      {/* <SearchButton /> */}
      <NavLocaleDropdown />
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
        <div className="px-4 pt-2">
          <I18nSelect
            display="block"
            locale={locale ?? 'en'}
            onChange={(newLocale: string) => {
              if (pathname == null) {
                return;
              }

              router.push(pathname, { locale: newLocale });
            }}
          />
        </div>
        {isLoggedIn && (
          <div className="space-y-1 px-2">
            {userNavigationLinks.map((props) => (
              <Anchor
                key={props.itemKey}
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
              <FormattedMessage
                defaultMessage="Get Full Access"
                description="Link label to the pricing page"
                id="OugnPX"
              />{' '}
              <span aria-hidden="true">→</span>
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
      isLoading={isUserProfileLoading}
      links={links}
      logo={<LogoLink />}
      mobileSidebarBottomItems={mobileSidebarBottomItems}
      renderMobileSidebarAddOnItems={renderMobileSidebarAddOnItems}
    />
  );
}
