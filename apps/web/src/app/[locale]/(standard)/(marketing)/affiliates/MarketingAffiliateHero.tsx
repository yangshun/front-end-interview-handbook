import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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
    <div className="isolate">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          fill="none"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
          />
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645">
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <main>
        <div ref={sectionMarkerRef} />
        <Container>
          <div
            className={clsx(
              'relative mx-auto max-w-xl px-4 py-24 transition-opacity duration-[1500ms] ease-in-out sm:max-w-3xl sm:px-12 md:max-w-4xl lg:max-w-5xl lg:px-0 lg:pt-32',
              isInView ? 'opacity-100' : 'opacity-0',
            )}>
            <div className="mx-auto max-w-3xl">
              <div>
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                  <div
                    className={clsx(
                      'relative overflow-hidden rounded-full border py-1.5 px-4 leading-6',
                      'ring-1 ring-inset ring-neutral-300/20',
                    )}>
                    <Text variant="body2">
                      <FormattedMessage
                        defaultMessage="Already an affiliate? <link>Access dashboard</link>"
                        description="Button to access dashboard above the Title of the 'Become An Affiliate' page's Hero section"
                        id="UltF1J"
                        values={{
                          link: (chunks) => (
                            <Anchor
                              className="text-brand font-semibold"
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
                    </Text>
                  </div>
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
                    className="mx-auto mt-8 max-w-md text-center text-xl md:mt-12 md:max-w-3xl xl:text-xl"
                    color="secondary"
                    display="block"
                    variant="custom">
                    <FormattedMessage
                      defaultMessage="Earn passive commissions when others purchase GreatFrontEnd through you."
                      description="Subtitle of the Hero section of the 'Become An Affiliate' page"
                      id="FAArTO"
                    />
                  </Text>
                  <div className="mx-auto mt-12 flex justify-center gap-x-4 sm:mt-16 sm:flex">
                    <Button
                      href="https://greatfrontend.firstpromoter.com"
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
                      variant="secondary"
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                  <svg
                    className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                    fill="none"
                    viewBox="0 0 1155 678"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                      fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                      fillOpacity=".3"
                    />
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                        x1="1155.49"
                        x2="-78.208"
                        y1=".177"
                        y2="474.645">
                        <stop stopColor="#9089FC" />
                        <stop offset={1} stopColor="#FF80B5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
