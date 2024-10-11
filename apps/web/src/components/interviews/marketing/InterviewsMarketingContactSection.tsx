import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  RiArrowRightLine,
  RiInformationLine,
  RiMailLine,
} from 'react-icons/ri';

import { SocialLinks } from '~/data/SocialLinks';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor_GroupHover,
  themeBorderColor,
  themeGradientHeading,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import InterviewsMarketingContactForm from './InterviewsMarketingContactForm';

export default function InterviewsMarketingContactSection() {
  const data: ReadonlyArray<{
    href: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    key: string;
    label: ReactNode;
    tooltip?: ReactNode;
  }> = [
    {
      href: 'mailto:contact@greatfrontend.com',
      icon: RiMailLine,
      key: 'mail',
      label: 'Email',
    },
    {
      href: SocialLinks.discord.href,
      icon: SocialLinks.discord.icon,
      key: 'discord',
      label: (
        <FormattedMessage
          defaultMessage="Join Discord (public)"
          description="Label for join discord"
          id="saKoIy"
        />
      ),
      tooltip: (
        <FormattedMessage
          defaultMessage="This is our public Discord channel for community discussions. We also have a more active private Discord (available to premium members only) for real-time support and for serious job seekers to connect."
          description="Description for join discord"
          id="cT2Qw6"
        />
      ),
    },
    {
      href: SocialLinks.linkedin.href,
      icon: SocialLinks.linkedin.icon,
      key: 'linkedin',
      label: (
        <FormattedMessage
          defaultMessage="Follow our LinkedIn page"
          description="Label for join LinkedIn"
          id="fc1KZ/"
        />
      ),
    },
    {
      href: SocialLinks.x.href,
      icon: SocialLinks.x.icon,
      key: 'x',
      label: (
        <FormattedMessage
          defaultMessage="Follow us on X"
          description="Label for join X"
          id="W+3cZW"
        />
      ),
    },
    {
      href: SocialLinks.github.href,
      icon: SocialLinks.github.icon,
      key: 'github',
      label: (
        <FormattedMessage
          defaultMessage="Follow us on GitHub"
          description="Label for join github"
          id="5sqnTc"
        />
      ),
    },
    {
      href: SocialLinks.reddit.href,
      icon: SocialLinks.reddit.icon,
      key: 'reddit',
      label: (
        <FormattedMessage
          defaultMessage="Join Reddit community"
          description="Label for join reddit"
          id="3gL2Vm"
        />
      ),
    },
  ];

  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Don't hesitate to reach out. We're always here to help."
          description="Title for marketing page section"
          id="RdVD3x"
        />
      </Heading>
      <Section>
        <div
          className={clsx(
            'mt-16',
            'grid gap-x-6 gap-y-12 md:gap-x-6 lg:grid-cols-12',
          )}>
          <div className="flex flex-col gap-10 lg:col-span-5">
            <Text
              className={clsx(
                'block',
                'text-base lg:text-lg',
                'lg:font-medium',
                'max-w-md lg:max-w-2xl',
              )}
              color="secondary"
              size="inherit"
              weight="inherit">
              <FormattedMessage
                defaultMessage="Have questions, feedback or anything to say? Contact us. We usually get back within a day or two."
                description="Marketing page section subtitle"
                id="TpWg4H"
              />
            </Text>
            <div
              className={clsx(
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1',
                'gap-x-6',
                '-py-5',
              )}>
              {data.map(({ key, label, icon: Icon, href, tooltip }) => (
                <div
                  key={key}
                  className={clsx(
                    'group relative',
                    'flex items-center gap-4',
                    'py-5',
                    ['border-b', themeBorderColor],
                    'last:border-b-0 md:last:border-b lg:last:border-b-0',
                  )}>
                  <div
                    className={clsx(
                      'flex items-center justify-center',
                      'rounded',
                      'size-8',
                      ['border', themeBorderColor],
                      themeBorderBrandColor_GroupHover,
                      'transition-colors',
                    )}>
                    <Icon
                      aria-hidden={true}
                      className={clsx(
                        'size-5 shrink-0',
                        themeTextSubtleColor,
                        themeTextBrandColor_GroupHover,
                        'transition-colors',
                      )}
                    />
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <Text color="subtitle" size="body2" weight="medium">
                      {label}
                    </Text>
                    {tooltip && (
                      <Tooltip label={tooltip}>
                        <RiInformationLine
                          className={clsx(
                            'size-4 relative z-[1] shrink-0',
                            themeTextSubtleColor,
                          )}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <RiArrowRightLine
                    className={clsx(
                      'size-5 transition-colors',
                      themeTextSubtleColor,
                      themeTextBrandColor_GroupHover,
                    )}
                  />
                  <Anchor
                    aria-label={key}
                    className="absolute inset-0"
                    href={href}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:col-span-1 lg:block" />
          <div className="lg:col-span-6">
            <InterviewsMarketingContactForm />
          </div>
        </div>
      </Section>
    </Container>
  );
}
