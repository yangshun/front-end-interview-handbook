'use client';

import clsx from 'clsx';

import gtag from '~/lib/gtag';

import { SocialLinks } from '~/data/SocialLinks';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import I18nSelect from '../i18n/I18nSelect';
import LogoLink from '../logos/LogoLink';

type FooterLink = Readonly<{
  href: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  name: string;
}>;
type FooterLinks = ReadonlyArray<FooterLink>;
type FooterLinkSection = {
  key: string;
  links: FooterLinks;
  title: string;
};

function useCommonFooterLinks() {
  const intl = useIntl();

  return {
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
    social: [
      SocialLinks.linkedin,
      SocialLinks.discord,
      SocialLinks.github,
      SocialLinks.x,
    ],
  };
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
                  <Text className="block" size="body2">
                    <Anchor
                      href={item.href}
                      variant="secondary"
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

export type FooterNavigation =
  | readonly [
      FooterLinkSection,
      FooterLinkSection,
      FooterLinkSection,
      FooterLinkSection,
    ]
  | [FooterLinkSection, FooterLinkSection, FooterLinkSection];

type Props = Readonly<{
  navigation: FooterNavigation;
}>;

export default function Footer({ navigation }: Props) {
  const intl = useIntl();
  const commonLinks = useCommonFooterLinks();
  const { locale, pathname } = useI18nPathname();
  const router = useI18nRouter();
  const copyrightStatement = (
    <Text className="block" color="secondary" size="body2">
      &copy; {new Date().getFullYear()}{' '}
      <FormattedMessage
        defaultMessage="Codeney Pte Ltd. All rights reserved."
        description="Footer copyright text containing the company name"
        id="DiyRBB"
      />
    </Text>
  );

  const legalSection = (
    <FooterSection
      links={commonLinks.legal}
      title={intl.formatMessage({
        defaultMessage: 'Legal',
        description:
          'Section heading in footer for links to legal pages like privacy policy and terms of service',
        id: '+wR7CJ',
      })}
    />
  );

  return (
    <footer
      aria-labelledby="footer-heading"
      className={clsx('border-t dark:bg-[#070708]', themeBorderColor)}>
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
                  {commonLinks.social.map(({ key, href, name, icon: Icon }) => (
                    <Anchor key={key} href={href} variant="secondary">
                      <span className="sr-only">{name}</span>
                      {Icon && <Icon aria-hidden="true" className="size-6" />}
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
                  links={navigation[0].links}
                  title={navigation[0].title}
                />
                <div className="mt-12 md:mt-0">
                  <FooterSection
                    links={navigation[1].links}
                    title={navigation[1].title}
                  />
                </div>
              </div>
              <div className="sm:grid-cols-2 md:col-span-2 md:grid md:gap-8">
                <div>
                  <FooterSection
                    links={navigation[2].links}
                    title={navigation[2].title}
                  />
                  {navigation[3] && (
                    <div className="mt-12 md:mt-8">{legalSection}</div>
                  )}
                </div>
                <div className="mt-12 md:mt-0">
                  {navigation[3] ? (
                    <FooterSection
                      links={navigation[3].links}
                      title={navigation[3].title}
                    />
                  ) : (
                    legalSection
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx('mt-12 border-t pt-8 lg:hidden', themeBorderColor)}>
            {copyrightStatement}
          </div>
        </Container>
      </Section>
    </footer>
  );
}
