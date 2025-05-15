'use client';

import clsx from 'clsx';

import gtag from '~/lib/gtag';

import useCommonFooterLinks from '~/components/global/footers/useCommonFooterLinks';
import LogoComboMark from '~/components/global/logos/LogoComboMark';
import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeTextBrandColor_Hover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

export default function SponsorsFooter() {
  const commonLinks = useCommonFooterLinks();

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
    <footer aria-labelledby="footer-heading">
      <Heading className="sr-only" id="footer-heading" level="custom">
        <FormattedMessage
          defaultMessage="Footer"
          description="Footer section heading"
          id="dfAvc7"
        />
      </Heading>
      <Section>
        <Container
          className={clsx('py-16', 'flex flex-col gap-8')}
          width="marketing">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <LogoComboMark height={20} />
            <div className="flex gap-x-5">
              {commonLinks.social.map(({ href, icon: Icon, key, name }) => (
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
          </div>
          <div
            className={clsx(
              'flex flex-wrap justify-between gap-6 gap-x-6 gap-y-4 sm:flex-row sm:items-center',
            )}>
            {copyrightStatement}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
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
