'use client';

import clsx from 'clsx';

import { fbqGFE } from '~/lib/fbq';
import gtag from '~/lib/gtag';
import { trpc } from '~/hooks/trpc';

import { SocialLinks } from '~/data/SocialLinks';

import I18nSelect from '~/components/global/i18n/I18nSelect';
import LogoLink from '~/components/global/logos/LogoLink';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import {
  themeBackgroundColor,
  themeBackgroundDarkColor,
  themeBorderColor,
  themeTextBrandColor_Hover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

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

  const {
    data: submitMessage,
    isLoading,
    failureReason,
    mutate: signUpWithEmail,
  } = trpc.marketing.signUpWithEmail.useMutation();

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

  const dividerDot = (
    <div
      className={clsx(
        'size-1 shrink-0 rounded-full',
        'bg-neutral-400 dark:bg-neutral-600',
      )}
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
        <Container className={clsx('py-14 md:py-20', 'flex flex-col gap-14')}>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-8 lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-y-4 md:col-span-3 lg:col-span-4">
              <div className="flex flex-col gap-y-8">
                <div>
                  <LogoLink />
                </div>
                <div>
                  <Text size="body2" weight="medium">
                    <FormattedMessage
                      defaultMessage="Subscribe to our newsletter"
                      description="Title for subscribe newsletter"
                      id="XTQvzh"
                    />
                  </Text>
                  <form
                    className={clsx(
                      'relative',
                      'w-full lg:max-w-[328px]',
                      'mb-2 mt-4',
                    )}
                    onSubmit={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      fbqGFE('track', 'Lead');

                      const data = new FormData(
                        event.target as HTMLFormElement,
                      );

                      signUpWithEmail({ email: data.get('email') as string });
                    }}>
                    <TextInput
                      autoComplete="email"
                      className={clsx(themeBackgroundDarkColor, 'pr-24')}
                      errorMessage={failureReason?.message}
                      isLabelHidden={true}
                      label={intl.formatMessage({
                        defaultMessage: 'Email',
                        description:
                          'Label for email field for subscribe newsletter',
                        id: 'gFyu0d',
                      })}
                      name="email"
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Enter your email',
                        description:
                          'Placeholder for email field for subscribe newsletter',
                        id: 'aI9TsY',
                      })}
                      type="email"
                    />
                    <Button
                      className={clsx(
                        'absolute right-1 top-1',
                        'border-none',
                        themeBackgroundColor,
                      )}
                      isDisabled={isLoading}
                      isLoading={isLoading}
                      label={intl.formatMessage({
                        defaultMessage: 'Notify me',
                        description:
                          'Label for notify me button for subscribe newsletter',
                        id: 'nhNfxq',
                      })}
                      size="xs"
                      type="submit"
                      variant="unstyled"
                    />
                  </form>
                  {submitMessage && (
                    <Text
                      className="block"
                      color="success"
                      size="body2"
                      weight="medium">
                      {submitMessage}
                    </Text>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-8 grid grid-cols-2 gap-12 md:grid-cols-4">
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
                </div>
                {navigation[3] && (
                  <div className="mt-12 md:mt-0">
                    <FooterSection
                      links={navigation[3].links}
                      title={navigation[3].title}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-8 lg:grid-cols-12">
            <div
              className={clsx(
                'flex flex-wrap items-center gap-x-10 gap-y-4',
                'md:col-span-8 lg:col-span-4',
              )}>
              <div className="flex gap-x-5">
                {commonLinks.social.map(({ key, href, name, icon: Icon }) => (
                  <Anchor key={key} href={href} variant="secondary">
                    <span className="sr-only">{name}</span>
                    {Icon && (
                      <Icon
                        aria-hidden="true"
                        className={clsx(
                          'size-6 shrink-0',
                          'transition-colors',
                          themeTextSubtleColor,
                          themeTextBrandColor_Hover,
                        )}
                      />
                    )}
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

            <div
              className={clsx(
                'col-span-8',
                'flex flex-wrap items-center gap-6',
              )}>
              {copyrightStatement}
              {dividerDot}
              {commonLinks.legal.map((item, index) => (
                <div
                  key={item.key}
                  className="flex items-center gap-x-6 gap-y-4">
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
                  {index !== commonLinks.legal.length - 1 && dividerDot}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
