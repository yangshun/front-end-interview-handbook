import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeDivideColor } from '~/components/ui/theme';

import { Disclosure } from '@headlessui/react';

// TODO: i18n
const faqs = [
  {
    answer: (
      <>
        To apply, you must:
        <ul className="list-outside list-disc pl-8">
          <li>
            Have an established audience through at least 1{' '}
            <strong className="font-medium">active</strong> channel that you
            own, such as a website, blog, video channel, courses or social
            media.
          </li>
          <li>Create original content.</li>
        </ul>
      </>
    ),
    key: 'requirements',
    question: <>What requirements do I need to meet to apply?</>,
  },
  {
    answer: <>No, signing up as an affiliate is completely free.</>,
    key: 'charges',
    question: <>Does it cost anything to join?</>,
  },
  {
    answer: (
      <>
        Our team will carefully review every application. In most cases,
        applications will be processed within 15 business days. If your
        application is approved, you will receive an acceptance email into the
        program.
      </>
    ),
    key: 'turnaround',
    question: <>How will I know my application has been accepted?</>,
  },
  {
    answer: (
      <div className="flex flex-col gap-y-4">
        <p>
          Once accepted into the affiliate program, you will receive a unique
          reference handle and affiliate link which will be used to track all
          your referrals.
        </p>
        <p>
          When sharing about GreatFrontEnd with your audience, always use your
          unique affiliate link.
        </p>
        <p>
          If users use your affiliate link to access our website, an attribution
          cookie will be added which lasts for 7 days. As long as the user
          purchases products within the duration of the cookie, you will earn
          15% commissions on their first order.
        </p>
      </div>
    ),
    key: 'tracking',
    question: <>How are referrals tracked?</>,
  },
  {
    answer: (
      <>
        We pay out a commission rate of 15% for all valid first purchases within
        7 days of the cookie window, with no limit in terms of the max
        commission or number of referrals that will be rewarded.
      </>
    ),
    key: 'commissions',
    question: <>What is the commission structure?</>,
  },
  {
    answer: (
      <>
        You will get paid at the end of every month. Payment is made directly to
        your PayPal account.
      </>
    ),
    key: 'paypal',
    question: <>How and when do I get paid?</>,
  },
  {
    answer: (
      <>
        Yes, our referral program is global. We sell to users in more than 100
        countries.
      </>
    ),
    key: 'global',
    question: <>Can I participate from outside the US?</>,
  },
];

export default function FrequentlyAskedQuestions() {
  return (
    <div>
      <Container variant="narrow">
        <div
          className={clsx(
            'relative py-24 transition-opacity duration-[1500ms] ease-in-out lg:pt-16',
          )}>
          <div>
            <Heading className="text-center" level="heading2">
              <FormattedMessage
                defaultMessage="FAQs."
                description="Frequently Asked Questions"
                id="LK0JHB"
              />
            </Heading>
            <Text
              className="mx-auto mt-4 justify-center px-4 text-center text-lg sm:mt-8 md:px-10 md:text-xl lg:px-20"
              color="secondary"
              display="block"
              size="custom">
              <FormattedMessage
                defaultMessage="Can't find the answer you are looking for? <link>Reach out to us!</link>"
                description="Subtitle under the Title of the FAQ section on the 'Become An Affiliate' page"
                id="ZCmkG3"
                values={{
                  link: (chunks) => (
                    <Anchor
                      className="text-brand-dark hover:text-brand mx-auto justify-center whitespace-nowrap font-medium"
                      href="mailto:contact@greatfrontend.com"
                      variant="unstyled">
                      {chunks}
                    </Anchor>
                  ),
                }}
              />
            </Text>
          </div>
          <Section>
            <div>
              <dl
                className={clsx(
                  'mt-6 space-y-6 divide-y lg:mt-12 lg:space-y-8',
                  themeDivideColor,
                )}>
                {faqs.map((faq) => (
                  <Disclosure
                    key={faq.key}
                    as="div"
                    className="pt-8"
                    defaultOpen={true}>
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left">
                            <Text
                              className="text-base sm:text-lg md:text-xl"
                              display="block"
                              size="custom"
                              weight="medium">
                              {faq.question}
                            </Text>
                            <span className="ml-6 flex h-7 items-center text-neutral-400 dark:text-neutral-600">
                              <RiArrowDownSLine
                                aria-hidden="true"
                                className={clsx(
                                  open ? '-rotate-180' : 'rotate-0',
                                  'h-6 w-6 transform',
                                )}
                              />
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-8 pr-12">
                          <Text
                            className="text-base sm:text-lg md:text-xl"
                            color="secondary"
                            display="block"
                            size="custom">
                            {faq.answer}
                          </Text>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </Section>
        </div>
      </Container>
    </div>
  );
}
