'use client';

import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import { useGuidesData } from '~/data/Guides';
import { useQuestionFormatLists } from '~/data/QuestionFormats';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useAppContext } from './AppContextProvider';
import LogoLink from './Logo';
import { isHiringCountry } from '../hiring/utils';

type FooterLink = Readonly<{
  href: string;
  key: string;
  name: string;
}>;
type FooterLinks = ReadonlyArray<FooterLink | null>;

function useFooterNavigation() {
  const questionFormatLists = useQuestionFormatLists();
  const guides = useGuidesData();
  const { countryCode } = useAppContext();

  const navigation: Record<string, FooterLinks> = {
    company: [
      { href: '/pricing', key: 'pricing', name: 'Pricing' },
      { href: '/about', key: 'about', name: 'About' },
      // Remove team page temporarily while we sort out incorporation.
      // { href: '/team', key: 'team', name: 'Team' },
      { href: '/contact', key: 'contact', name: 'Contact Us' },
      { href: '/affiliates', key: 'affiliates', name: 'Become an Affiliate' },
      isHiringCountry(countryCode)
        ? {
            href: '/hiring',
            key: 'hiring',
            name: "We're Hiring",
          }
        : null,
    ],
    guides: [
      {
        href: guides['front-end-interview-guidebook'].href,
        key: guides['front-end-interview-guidebook'].key,
        name: guides['front-end-interview-guidebook'].name,
      },
      {
        href: guides['front-end-system-design-guidebook'].href,
        key: guides['front-end-system-design-guidebook'].key,
        name: guides['front-end-system-design-guidebook'].name,
      },
      {
        href: guides['behavioral-interview-guidebook'].href,
        key: guides['behavioral-interview-guidebook'].key,
        name: guides['behavioral-interview-guidebook'].name,
      },
    ],
    legal: [
      { href: '/legal/privacy-policy', key: 'privacy', name: 'Privacy Policy' },
      { href: '/legal/terms', key: 'tos', name: 'Terms of Service' },
    ],
    practice: [
      { href: '/get-started', key: 'get_started', name: 'Get Started' },
      {
        href: questionFormatLists.coding.href,
        key: 'questions.coding',
        name: `${questionFormatLists.coding.name} Questions`,
      },
      {
        href: questionFormatLists['system-design'].href,
        key: 'questions.system_design',
        name: `${questionFormatLists['system-design'].name} Questions`,
      },
      {
        href: questionFormatLists.quiz.href,
        key: 'questions.quiz',
        name: `${questionFormatLists.quiz.name} Questions`,
      },
    ],
    preparationPlans: [
      { href: '/prepare/one-week', key: 'one_week', name: '1 Week Plan' },
      { href: '/prepare/one-month', key: 'one_month', name: '1 Month Plan' },
      {
        href: '/prepare/three-months',
        key: 'three_months',
        name: '3 Months Plan',
      },
    ],
  };

  return navigation;
}

function FooterSection({
  title,
  links,
}: Readonly<{
  links: FooterLinks;
  title: string;
}>) {
  return (
    <div className="flex flex-col gap-y-4">
      <Heading className="text-sm font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </Heading>
      <Section>
        <ul className="flex flex-col gap-y-3" role="list">
          {links
            .filter((item) => item != null)
            .map((item_) => {
              const item = item_ as FooterLink;

              return (
                <li key={item.name}>
                  <Text variant="body2">
                    <Anchor
                      href={item.href}
                      variant="muted"
                      weight="regular"
                      onClick={() => {
                        gtag.event({
                          action: `footer.${item.key}.click`,
                          category: 'engagement',
                          label: item.name,
                        });
                      }}>
                      {item.name}
                    </Anchor>
                  </Text>
                </li>
              );
            })}
        </ul>
      </Section>
    </div>
  );
}

export default function Footer() {
  const intl = useIntl();
  const navigation = useFooterNavigation();

  return (
    <footer
      aria-labelledby="footer-heading"
      className="border-t border-slate-200 bg-white">
      <Heading className="sr-only" id="footer-heading">
        <FormattedMessage
          defaultMessage="Footer"
          description="Footer section heading"
          id="dfAvc7"
        />
      </Heading>
      <Section>
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:pt-24 lg:pb-16">
          <div className="xl:grid xl:grid-cols-4 xl:gap-8">
            <div className="space-y-4 xl:col-span-1">
              <div>
                <LogoLink size="xl" />
              </div>
              <p className="text-sm text-slate-500">
                <FormattedMessage
                  defaultMessage="The most complete all-in-one front end interview preparation platform."
                  description="Text under GreatFrontEnd logo on the Footer, to describe main offering"
                  id="OL9m/V"
                />
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-3 xl:mt-0">
              <div className="sm:grid-cols-2 md:col-span-2 md:grid md:gap-8">
                <FooterSection
                  links={navigation.practice}
                  title={intl.formatMessage({
                    defaultMessage: 'Practice',
                    description:
                      'Section heading in footer for links to practice question pages',
                    id: '3z2LJp',
                  })}
                />
                <div className="mt-12 md:mt-0">
                  <FooterSection
                    links={navigation.guides}
                    title={intl.formatMessage({
                      defaultMessage: 'Guides',
                      description:
                        'Section heading in footer for links to interview guides',
                      id: 'sn/P86',
                    })}
                  />
                </div>
              </div>
              <div className="sm:grid-cols-2 md:col-span-2 md:grid md:gap-8">
                <div>
                  <FooterSection
                    links={navigation.preparationPlans}
                    title={intl.formatMessage({
                      defaultMessage: 'Study Plans',
                      description:
                        'Section heading in footer for links to study plans (i.e. recommended order to study and practice based on specific timelines e.g. prepare in 1 week, 1 month or 3 months)',
                      id: '8klsso',
                    })}
                  />
                </div>
                <div className="mt-12 md:mt-0">
                  <FooterSection
                    links={navigation.company}
                    title={intl.formatMessage({
                      defaultMessage: 'Company',
                      description:
                        'Section heading in footer for links to company-related pages like pricing, about, contact us, affiliate, etc.',
                      id: 'CBU+k0',
                    })}
                  />
                  <div className="mt-12 md:mt-8">
                    <FooterSection
                      links={navigation.legal}
                      title={intl.formatMessage({
                        defaultMessage: 'Legal',
                        description:
                          'Section heading in footer for links to legal pages like privacy policy and terms of service',
                        id: '+wR7CJ',
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-200 pt-8">
            <p className="text-base text-slate-400 xl:text-center">
              {/* TODO: i18n */}
              &copy; {new Date().getFullYear()} Codeney Pte Ltd. All rights
              reserved.
            </p>
          </div>
        </div>
      </Section>
    </footer>
  );
}
