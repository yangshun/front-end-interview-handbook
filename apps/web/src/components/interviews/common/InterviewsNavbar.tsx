'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { RiPlayLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import gtag from '~/lib/gtag';
import useIsSticky from '~/hooks/useIsSticky';
import { useAuthLogout, useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useUserProfile from '~/hooks/user/useUserProfile';

import { getFocusAreaTheme } from '~/data/focus-areas/FocusAreas';
import { useFocusAreas } from '~/data/focus-areas/FocusAreasHooks';
import { useGuidesData } from '~/data/Guides';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';
import { usePreparationPlans } from '~/data/plans/PreparationPlansHooks';
import {
  useQuestionFormatLists,
  useQuestionTechnologyLists,
} from '~/data/QuestionFormats';

import I18nSelect from '~/components/common/i18n/I18nSelect';
import ColorSchemeSelect from '~/components/global/color-scheme/ColorSchemeSelect';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Navbar from '~/components/ui/Navbar/Navbar';
import type {
  NavbarPrimaryItem,
  NavLinkItem,
} from '~/components/ui/Navbar/NavTypes';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import { useColorSchemePreferences } from '../../global/color-scheme/ColorSchemePreferencesProvider';
import LogoLink from '../../global/logos/LogoLink';
import NavColorSchemeDropdown from '../../global/navbar/NavColorSchemeDropdown';
import NavLocaleDropdown from '../../global/navbar/NavLocaleDropdown';
import NavProfileIcon from '../../global/navbar/NavProfileIcon';

import { useUser } from '@supabase/auth-helpers-react';

function useNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarPrimaryItem> {
  const intl = useIntl();
  const { signInUpLabel, signInUpHref } = useAuthSignInUp();

  const questionTechnologyLists = useQuestionTechnologyLists();
  const questionFormatLists = useQuestionFormatLists();
  const preparationPlans = usePreparationPlans();
  const focusAreas = useFocusAreas();
  const guides = useGuidesData();

  const links: ReadonlyArray<NavbarPrimaryItem | null> = [
    {
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
    },
    {
      align: 'start',
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
            icon: RiPlayLine,
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
              href: questionTechnologyLists.js.href,
              icon: questionTechnologyLists.js.icon,
              itemKey: questionTechnologyLists.js.key,
              label: questionTechnologyLists.js.longName,
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
              href: questionTechnologyLists.html.href,
              icon: questionTechnologyLists.html.icon,
              itemKey: questionTechnologyLists.html.key,
              label: questionTechnologyLists.html.longName,
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
              href: questionTechnologyLists.css.href,
              icon: questionTechnologyLists.css.icon,
              itemKey: questionTechnologyLists.css.key,
              label: questionTechnologyLists.css.longName,
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
              href: questionTechnologyLists.react.href,
              icon: questionTechnologyLists.react.icon,
              itemKey: questionTechnologyLists.react.key,
              label: questionTechnologyLists.react.longName,
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
              href: questionTechnologyLists.angular.href,
              icon: questionTechnologyLists.angular.icon,
              itemKey: questionTechnologyLists.angular.key,
              label: questionTechnologyLists.angular.name,
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
              href: questionTechnologyLists.svelte.href,
              icon: questionTechnologyLists.svelte.icon,
              itemKey: questionTechnologyLists.svelte.key,
              label: questionTechnologyLists.svelte.name,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.topic.svelte.click`,
                  category: 'engagement',
                  label: 'Svelte',
                });
              },
              type: 'popover-link',
            },
            {
              icon: questionTechnologyLists.vue.icon,
              itemKey: questionTechnologyLists.vue.key,
              label: questionTechnologyLists.vue.name,
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
              href: preparationPlans['one-week'].href,
              icon: getPreparationPlanTheme('one-week').iconOutline,
              itemKey: preparationPlans['one-week'].type,
              label: preparationPlans['one-week'].longName,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.plans.one_week.click`,
                  category: 'engagement',
                  label: '1 Week Plan',
                });
              },
              sublabel: preparationPlans['one-week'].shortDescription,
              type: 'popover-link',
            },
            {
              href: preparationPlans['one-month'].href,
              icon: getPreparationPlanTheme('one-month').iconOutline,
              itemKey: preparationPlans['one-month'].type,
              label: preparationPlans['one-month'].longName,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.plans.one_month.click`,
                  category: 'engagement',
                  label: '1 Month Plan',
                });
              },
              sublabel: preparationPlans['one-month'].shortDescription,
              type: 'popover-link',
            },
            {
              href: preparationPlans['three-months'].href,
              icon: getPreparationPlanTheme('three-months').iconOutline,
              itemKey: preparationPlans['three-months'].type,
              label: preparationPlans['three-months'].longName,
              onClick: () => {
                gtag.event({
                  action: `nav.practice.plans.three_months.click`,
                  category: 'engagement',
                  label: '3 Months Plan',
                });
              },
              sublabel: preparationPlans['three-months'].shortDescription,
              type: 'popover-link',
            },
          ],
          label: intl.formatMessage({
            defaultMessage: 'Practice with study plans and timelines',
            description: 'Section title for study plans',
            id: 'CQOAJS',
          }),
          supplementaryItem: {
            href: '/study-plans',
            icon: RiPlayLine,
            itemKey: 'study-plans',
            label: intl.formatMessage({
              defaultMessage: 'View study plans',
              description: 'Link label to view all study plans',
              id: 'lGUj4P',
            }),
            type: 'link',
          },
          type: 'popover-list',
        },
        {
          itemKey: 'focus-areas',
          items: (
            [
              'async-operations',
              'data-structures-algorithms',
              'design-system-components',
              'lodash',
              'dom-manipulation',
              'accessibility',
              'javascript-polyfills',
              'forms',
            ] as const
          ).map((focusArea) => ({
            href: focusAreas[focusArea].href,
            icon: getFocusAreaTheme(focusArea).iconOutline,
            itemKey: focusAreas[focusArea].type,
            key: focusArea,
            label: focusAreas[focusArea].longName,
            onClick: () => {
              gtag.event({
                action: `nav.practice.focus_areas.${focusAreas[focusArea].type}.click`,
                category: 'engagement',
                label: focusAreas[focusArea].longName,
              });
            },
            type: 'popover-link',
          })),
          label: intl.formatMessage({
            defaultMessage: 'Practice for specific focus areas',
            description: 'Section title',
            id: 'PigS2u',
          }),
          supplementaryItem: {
            href: '/focus-areas',
            icon: RiPlayLine,
            itemKey: 'focus-areas',
            label: intl.formatMessage({
              defaultMessage: 'View focus areas',
              description: 'Link label to view all focus areas',
              id: 'PvVu6g',
            }),
            type: 'link',
          },
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
      align: 'center',
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
      href: '/blog',
      itemKey: 'blog',
      label: intl.formatMessage({
        defaultMessage: 'Blog',
        description: 'Link to blog',
        id: 'pBR3LI',
      }),
      onClick: () => {
        gtag.event({
          action: `nav.blog.click`,
          category: 'engagement',
          label: 'Blog',
        });
      },
      position: 'start',
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
          href: signInUpHref(),
          itemKey: 'login',
          label: signInUpLabel,
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
  const { logoutLabel, logoutHref } = useAuthLogout();

  const userNavigation: ReadonlyArray<NavLinkItem> = [
    {
      href: '/profile',
      itemKey: 'profile',
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
      href: logoutHref(),
      itemKey: 'logout',
      label: logoutLabel,
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
//       className="bg-neutral-50 shrink-0 rounded-full p-1 text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-50 focus:ring-brand">
//       <span className="sr-only">Search website</span>
//       <SearchIcon className="size-6" aria-hidden="true" />
//     </button>
//   );
// }

export default function InterviewsNavbar() {
  const { colorSchemePreference, setColorSchemePreference } =
    useColorSchemePreferences();
  const user = useUser();
  const { isLoading: isUserProfileLoading, userProfile } = useUserProfile();
  const intl = useIntl();
  const isLoggedIn = user != null;
  const isPremium = userProfile?.premium ?? false;
  const links = useNavLinks(isLoggedIn, isPremium);
  const userNavigationLinks = useUserNavigationLinks();
  const { locale, pathname } = useI18nPathname();
  const router = useI18nRouter();
  const navbarRef = useRef(null);
  const { isSticky } = useIsSticky(navbarRef);

  const endAddOnItems = (
    <>
      {/* <SearchButton /> */}
      <NavLocaleDropdown />
      <NavColorSchemeDropdown />
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
          variant="primary"
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
          avatarUrl={userProfile?.avatarUrl ?? user?.user_metadata?.avatar_url}
          navItems={userNavigationLinks}
          userIdentifierString={userProfile?.name ?? user?.email}
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
      <div className={clsx('grid gap-y-2')}>
        <div className="grid grid-cols-2 gap-2 px-4 pt-4">
          <I18nSelect
            display="block"
            locale={locale ?? 'en-US'}
            onChange={(newLocale: string) => {
              if (pathname == null) {
                return;
              }

              router.push(pathname, { locale: newLocale });
            }}
          />
          <ColorSchemeSelect
            colorScheme={colorSchemePreference}
            display="block"
            onChange={setColorSchemePreference}
          />
        </div>
        {isLoggedIn && (
          <div className="grid gap-y-1 px-2">
            {userNavigationLinks.map((props) => (
              <Anchor
                key={props.itemKey}
                className={clsx(
                  'group flex items-center rounded px-2 py-2 text-xs font-medium',
                  themeTextSecondaryColor,
                  themeBackgroundLayerEmphasized_Hover,
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
          <div className="px-4">
            <Button
              display="block"
              href="/pricing"
              label={intl.formatMessage({
                defaultMessage: 'Get Full Access',
                description: 'Link label to the pricing page',
                id: 'OugnPX',
              })}
              variant="primary"
              onClick={() => {
                closeMobileNav();
                gtag.event({
                  action: `nav.get_full_access.click`,
                  category: 'ecommerce',
                  label: 'Get Full Access',
                });
              }}
            />
          </div>
        )}
      </div>
    );
  }

  const displayName = userProfile?.name ?? user?.email;

  const mobileSidebarBottomItems = isLoggedIn && (
    <div className="flex shrink-0 items-center gap-x-3">
      <Avatar alt={displayName ?? ''} src={userProfile?.avatarUrl ?? ''} />
      <Text className="block" color="subtitle" size="body2" weight="medium">
        {displayName}
      </Text>
    </div>
  );

  return (
    <Navbar
      ref={navbarRef}
      endAddOnItems={endAddOnItems}
      isLoading={isUserProfileLoading}
      links={links}
      logo={<LogoLink />}
      mobileSidebarBottomItems={mobileSidebarBottomItems}
      renderMobileSidebarAddOnItems={renderMobileSidebarAddOnItems}
      style={{ top: 'var(--banner-height)' }}
      transparent={!isSticky}
    />
  );
}
