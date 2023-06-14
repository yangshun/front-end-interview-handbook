import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import Text from '../ui/Text';
import { themeDivideColor, themeTextSubtitleColor } from '../ui/theme';

import { Disclosure } from '@headlessui/react';

const faqs = [
  {
    answer: (
      <FormattedMessage
        defaultMessage="For a limited time, we are offering lifetime access at a discount, which will provide you immediate access to our huge question bank, guides, and study plans. All future updates to our interview preparation platform will also be completely free for you."
        description="Answer to 'What does buying GreatFrontEnd get me' on Homepage's FAQ sections"
        id="GYwmPt"
      />
    ),
    key: 'buying',
    question: (
      <FormattedMessage
        defaultMessage="What does buying GreatFrontEnd get me?"
        description="Question on Homepage's FAQ section - on what the user will receive after purchasing GreatFrontEnd"
        id="0RaY4p"
      />
    ),
  },
  {
    answer: (
      <FormattedMessage
        defaultMessage="There are currently quiz questions, JavaScript coding questions, User Interface coding questions and System Design content."
        description="Answer to 'What types of questions do you have on your platform?' on Homepage's FAQ sections"
        id="+ywzSI"
      />
    ),
    key: 'questions',
    question: (
      <FormattedMessage
        defaultMessage="What types of questions do you have on your platform?"
        description="Question on Homepage's FAQ section - on the types of practice questions available on the platform"
        id="1FbA4H"
      />
    ),
  },
  {
    answer: (
      <>
        <FormattedMessage
          defaultMessage="Our lifetime access plan costs less than 1 hour of an average Front End Engineer's salary. Meanwhile, the reward for acing your interviews could be an increase in hundreds of thousands of total compensation."
          description="Paragraph 1 answer to 'Is it really worth it to buy GreatFrontEnd?' on Homepage's FAQ sections"
          id="YMfxks"
        />
        <br />
        <br />
        <FormattedMessage
          defaultMessage="Moreover, out of the resources in the market for front end interview preparation, our platform boasts the largest number of questions with solutions written by experienced Senior Front End Engineers previously from FAANG, who were also ex-interviewers."
          description="Paragraph 2 answer to 'Is it really worth it to buy GreatFrontEnd?' on Homepage's FAQ sections"
          id="IuWsYS"
        />
        {/* TODO: We
            are also the only one carrying front end system design questions (with
            answers). */}
      </>
    ),
    key: 'worth-it',
    question: (
      <FormattedMessage
        defaultMessage="Is it really worth it to buy GreatFrontEnd?"
        description="Question on Homepage's FAQ section - on the worthiness of purchasing the product"
        id="SAFY5p"
      />
    ),
  },
  {
    answer: (
      <FormattedMessage
        defaultMessage="There is something to learn from GreatFrontEnd for engineers of all seniority levels. Junior engineers will be able to solidify their fundamentals and learn techniques they never knew about. Mid-level engineers will benefit from more advanced concepts like internationalization, accessibility, and performance. Senior engineers will benefit most from the system design questions which impart architectural concepts."
        description="Answer to 'Is GreatFrontEnd targeted at engineers of specific seniority?' on Homepage's FAQ sections"
        id="TQLJ/G"
      />
    ),
    key: 'seniority',
    question: (
      <FormattedMessage
        defaultMessage="Is GreatFrontEnd targeted at engineers of specific seniority?"
        description="Question on Homepage's FAQ section - on the seniority level of engineers that GreatFrontEnd targets"
        id="jzVpyI"
      />
    ),
  },
  {
    answer: (
      <FormattedMessage
        defaultMessage="It is a <strong>one-time purchase, with no recurring subscription</strong>. You get access to all the content in GreatFrontEnd's interview platform forever, along with any future updates. This will be useful and relevant for all future job hunts."
        description="Answer to 'What does lifetime access mean?' on Homepage's FAQ sections"
        id="IUYG0x"
        values={{
          strong: (chunks) => <strong className="font-medium">{chunks}</strong>,
        }}
      />
    ),
    key: 'lifetime-access',
    question: (
      <FormattedMessage
        defaultMessage='What does "lifetime access" mean?'
        description="Question on Homepage's FAQ section - on the scope of the lifetime access pricing plan on the interview platform"
        id="2YMuJe"
      />
    ),
  },
  {
    answer: (
      <FormattedMessage
        defaultMessage="You will get access to every new question and any guide we add in future. As new technologies and trends emerge, we update our questions and potentially add new questions/formats to keep up with the trends and you will get access to all of them."
        description="Answer to 'What does free updates include?' on Homepage's FAQ sections"
        id="nOvXhk"
      />
    ),
    key: 'free-updates',
    question: (
      <FormattedMessage
        defaultMessage='What does "free updates" include?'
        description="Question on Homepage's FAQ section - on the scope of complimentary updates to the GreatFrontEnd interview platform"
        id="OcBA+t"
      />
    ),
  },
];

export default function FrequentlyAskedQuestions() {
  return (
    <Container variant="narrow">
      <div className="relative space-y-10 py-24 lg:py-40">
        <div>
          <Heading className="text-center" level="heading2">
            <FormattedMessage
              defaultMessage="FAQs."
              description="Frequently Asked Questions"
              id="LK0JHB"
            />
          </Heading>
          <Text
            className="mx-auto mt-4 justify-center px-10 text-center sm:mt-8 md:text-xl lg:px-20"
            color="secondary"
            display="block"
            size="custom">
            <FormattedMessage
              defaultMessage="Can't find the answer you are looking for? <link>Reach out to us!</link>"
              description="Subtitle of Homepage's FAQ section, encouraging users to contact us if none of the FAQs resolve their problems"
              id="JQa3Or"
              values={{
                link: (chunks) => (
                  <Anchor
                    className="whitespace-nowrap"
                    href="mailto:contact@greatfrontend.com"
                    weight="medium">
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
                <Disclosure key={faq.key} as="div" className="pt-8">
                  {({ open }) => (
                    <>
                      <dt className="text-base sm:text-lg md:text-xl">
                        <Disclosure.Button className="flex w-full items-start justify-between text-left">
                          <Text
                            className="text-base sm:text-lg md:text-xl"
                            color="subtitle"
                            display="block"
                            size="custom"
                            weight="medium">
                            {faq.question}
                          </Text>
                          <span
                            className={clsx(
                              'ml-6 flex h-7 items-center',
                              themeTextSubtitleColor,
                            )}>
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
  );
}
