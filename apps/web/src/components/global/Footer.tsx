'use client';

import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import { useGuidesData } from '~/data/Guides';
import { useQuestionFormatLists } from '~/data/QuestionFormats';

import DiscordIcon from '~/components/icons/DiscordIcon';
import GitHubIcon from '~/components/icons/GitHubIcon';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeLineColor } from '~/components/ui/theme';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import LogoLink from './Logo';
import I18nSelect from '../i18n/I18nSelect';
import TwitterIcon from '../icons/TwitterIcon';

type FooterLink = Readonly<{
  href: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  name: string;
}>;
type FooterLinks = ReadonlyArray<FooterLink>;

function useFooterNavigation() {
  const intl = useIntl();
  const questionFormatLists = useQuestionFormatLists();
  const guides = useGuidesData();

  const navigation: Record<string, FooterLinks> = {
    company: [
      {
        href: '/pricing',
        key: 'pricing',
        name: intl.formatMessage({
          defaultMessage: 'Pricing',
          description: 'Link to pricing plans page',
          id: 't5L0yE',
        }),
      },
      {
        href: '/about',
        key: 'about',
        name: intl.formatMessage({
          defaultMessage: 'About',
          description: "Link to company's about page",
          id: '+5JohH',
        }),
      },
      { href: '/team', key: 'team', name: 'Our Team' },
      {
        href: '/contact',
        key: 'contact',
        name: intl.formatMessage({
          defaultMessage: 'Contact Us',
          description: 'Link to contact us page',
          id: '8iiFM+',
        }),
      },
      {
        href: '/affiliates',
        key: 'affiliates',
        name: intl.formatMessage({
          defaultMessage: 'Become an Affiliate',
          description: 'Link to affiliate marketing program page',
          id: 'XS6Jyn',
        }),
      },
      {
        href: '/jobs',
        key: 'hiring',
        name: intl.formatMessage({
          defaultMessage: "We're Hiring",
          description: 'Link to careers page',
          id: 'ivmSx0',
        }),
      },
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
      {
        href: '/legal/privacy-policy',
        key: 'privacy',
        name: intl.formatMessage({
          defaultMessage: 'Privacy Policy',
          description: 'Link to privacy policy page',
          id: 'ITq0p4',
        }),
      },
      {
        href: '/legal/terms',
        key: 'tos',
        name: intl.formatMessage({
          defaultMessage: 'Terms of Service',
          description: 'Link to terms of service page',
          id: 'zIQsmk',
        }),
      },
    ],
    practice: [
      {
        href: '/get-started',
        key: 'get_started',
        name: intl.formatMessage({
          defaultMessage: 'Get Started',
          description: 'Link to get started page',
          id: '15O0qb',
        }),
      },
      {
        href: questionFormatLists.coding.href,
        key: 'questions.coding',
        name: questionFormatLists.coding.longName,
      },
      {
        href: questionFormatLists['system-design'].href,
        key: 'questions.system_design',
        name: questionFormatLists['system-design'].longName,
      },
      {
        href: questionFormatLists.quiz.href,
        key: 'questions.quiz',
        name: questionFormatLists.quiz.longName,
      },
    ],
    preparationPlans: [
      {
        href: '/prepare/one-week',
        key: 'one_week',
        name: intl.formatMessage({
          defaultMessage: '1 Week Plan',
          description: 'Link to one week study plan',
          id: 'i4MSQe',
        }),
      },
      {
        href: '/prepare/one-month',
        key: 'one_month',
        name: intl.formatMessage({
          defaultMessage: '1 Month Plan',
          description: 'Link to one month study plan',
          id: 'CBhQ13',
        }),
      },
      {
        href: '/prepare/three-months',
        key: 'three_months',
        name: intl.formatMessage({
          defaultMessage: '3 Months Plan',
          description: 'Link to three months study plan',
          id: 'PGFsFr',
        }),
      },
    ],
    social: [
      {
        href: 'https://www.twitter.com/greatfrontend',
        icon: TwitterIcon,
        key: 'twitter',
        name: 'Twitter',
      },
      {
        href: 'https://discord.gg/NDFx8f6P6B',
        icon: DiscordIcon,
        key: 'discord',
        name: 'Discord',
      },
      {
        href: 'https://www.github.com/greatfrontend',
        icon: GitHubIcon,
        key: 'github',
        name: 'GitHub',
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
    <div className="flex flex-col gap-y-2">
      <Heading color="custom" level="custom">
        <Text size="body2" weight="medium">
          {title}
        </Text>
      </Heading>
      <Section>
        <ul className="flex flex-col gap-y-2" role="list">
          {links
            .filter((item) => item != null)
            .map((item_) => {
              const item = item_ as FooterLink;

              return (
                <li key={item.key}>
                  <Text display="block" size="body2">
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
  const { locale, pathname } = useI18nPathname();
  const router = useI18nRouter();
  const copyrightStatement = (
    <Text color="secondary" display="block" size="body2">
      &copy; {new Date().getFullYear()}{' '}
      <FormattedMessage
        defaultMessage="Codeney Pte Ltd. All rights reserved."
        description="Footer copyright text containing the company name"
        id="DiyRBB"
      />
    </Text>
  );

  return (
    <footer
      aria-labelledby="footer-heading"
      className={clsx('border-t bg-[#070708]', themeLineColor)}>
      <Heading className="sr-only" id="footer-heading" level="custom">
        <FormattedMessage
          defaultMessage="Footer"
          description="Footer section heading"
          id="dfAvc7"
        />
      </Heading>
      <Section>
        <Container className="py-12 lg:py-16">
          <div className="lg:grid lg:grid-cols-3 xl:gap-8">
            <div className="flex flex-col justify-between gap-y-4 xl:col-span-1">
              <div className="flex flex-col gap-y-6">
                <div>
                  <LogoLink />
                </div>
                <div className="flex gap-x-5">
                  {navigation.social.map(({ key, href, name, icon: Icon }) => (
                    <Anchor key={key} href={href} variant="muted">
                      <span className="sr-only">{name}</span>
                      {Icon && <Icon aria-hidden="true" className="h-6 w-6" />}
                    </Anchor>
                  ))}
                </div>
                <div>
                  <I18nSelect
                    locale={locale ?? 'en-US'}
                    onChange={(newLocale: string) => {
                      if (pathname == null) {
                        return;
                      }

                      router.push(pathname, { locale: newLocale });
                    }}
                  />
                </div>
              </div>
              <div className="hidden lg:block">{copyrightStatement}</div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-12 md:grid-cols-4 lg:col-span-2 lg:mt-0">
              <div className="sm:grid-cols-2 md:col-span-2 md:grid md:gap-12">
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
          <div
            className={clsx('mt-12 border-t pt-8 lg:hidden', themeLineColor)}>
            {copyrightStatement}
          </div>
        </Container>
      </Section>
    </footer>
  );
}
