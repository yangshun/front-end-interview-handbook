import clsx from 'clsx';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

export default function MarketingAffiliateHero() {
  const intl = useIntl();
  const sectionMarkerRef = useRef(null);
  const isInView = useInView(sectionMarkerRef, {
    amount: 'all',
    once: true,
  });

  return (
    <div className="theme-bg-radial-glow isolate before:opacity-30">
      <main>
        <div ref={sectionMarkerRef} />
        <Container width="marketing">
          <div
            className={clsx(
              'relative mx-auto max-w-xl px-4 py-24 transition-opacity duration-1000 ease-in-out sm:max-w-3xl sm:px-12 md:max-w-4xl lg:max-w-5xl lg:px-0 lg:pt-32',
              isInView ? 'opacity-100' : 'opacity-0',
            )}>
            <div className="mx-auto max-w-3xl">
              <div>
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                  <span
                    className={clsx(
                      'group relative inline-flex items-center gap-x-1 rounded-full',
                      'px-3 py-0.5',
                      'text-sm font-medium text-neutral-300',
                      'bg-brand/20 hover:bg-brand/30 transition-colors',
                      'shiny shadow-sm',
                    )}>
                    <FormattedMessage
                      defaultMessage="Already an affiliate? <link>Access dashboard</link>"
                      description="Button to access dashboard above the Title of the 'Become An Affiliate' page's Hero section"
                      id="UltF1J"
                      values={{
                        link: (chunks) => (
                          <Anchor
                            className="font-semibold"
                            href="https://greatfrontend.firstpromoter.com/login"
                            variant="unstyled">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {chunks} <span aria-hidden="true">&rarr;</span>
                          </Anchor>
                        ),
                      }}
                    />
                  </span>
                </div>
                <div>
                  <Heading className="text-center" level="heading1">
                    <FormattedMessage
                      defaultMessage="Spread the word and get rewarded"
                      description="Title of the Hero section of the 'Become An Affiliate' page"
                      id="lfY3AI"
                    />
                  </Heading>
                  <Text
                    className="mx-auto mt-8 block max-w-md text-center text-xl md:mt-12 md:max-w-3xl xl:text-xl"
                    color="secondary"
                    size="inherit">
                    <FormattedMessage
                      defaultMessage="Earn passive commissions when others purchase GreatFrontEnd through you."
                      description="Subtitle of the Hero section of the 'Become An Affiliate' page"
                      id="FAArTO"
                    />
                  </Text>
                  <div className="mx-auto mt-12 flex justify-center gap-x-4 sm:mt-16 sm:flex">
                    <Button
                      href="https://greatfrontend.firstpromoter.com"
                      icon={RiArrowRightLine}
                      label={intl.formatMessage({
                        defaultMessage: 'Start in minutes',
                        description:
                          "Button leading user to sign up to be an affiliate on the Hero section of the 'Become An Affiliate' page",
                        id: 'wzQGxj',
                      })}
                      size="lg"
                      variant="primary"
                    />
                    <Button
                      href="mailto:contact@greatfrontend.com?subject=GreatFrontEnd Affiliate"
                      label={intl.formatMessage({
                        defaultMessage: 'Ask us about it',
                        description:
                          'Button that opens up mail for user to send us an email about their question about the Affiliate program',
                        id: 'Us7Uly',
                      })}
                      size="lg"
                      variant="tertiary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
