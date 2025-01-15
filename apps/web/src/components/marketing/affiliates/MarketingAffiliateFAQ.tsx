import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingFAQSection from '~/components/marketing/faqs/MarketingFAQSection';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

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
      <>
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
      </>
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

export default function MarketingAffialiateFAQ() {
  const intl = useIntl();

  return (
    <div>
      <Container
        className="max-lg:theme-bg-radial-glow relative isolate flex flex-col gap-y-12 py-24 max-lg:rounded-t-3xl lg:py-32"
        width="marketing">
        <MarketingSectionHeader
          description={
            <FormattedMessage
              defaultMessage="Can't find the answer you are looking for? <link>Reach out to us!</link>"
              description="Subtitle under the Title of the FAQ section on the 'Become An Affiliate' page"
              id="ZCmkG3"
              values={{
                link: (chunks) => (
                  <Anchor
                    className="mx-auto justify-center whitespace-nowrap font-medium"
                    href="mailto:contact@greatfrontend.com">
                    {chunks}
                  </Anchor>
                ),
              }}
            />
          }
          heading={
            <FormattedMessage
              defaultMessage="FAQs"
              description="Frequently Asked Questions"
              id="DIs2lU"
            />
          }
        />
        <Section>
          <MarketingFAQSection
            faqs={faqs}
            hideTitle={true}
            title={intl.formatMessage({
              defaultMessage: 'General',
              description: 'Title for FAQ section',
              id: 'FRg+qa',
            })}
          />
        </Section>
      </Container>
    </div>
  );
}
