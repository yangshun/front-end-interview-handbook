import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingFAQSection from '~/components/marketing/faqs/MarketingFAQSection';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

export default function MarketingAffialiateFAQ() {
  const intl = useIntl();

  const faqs = [
    {
      answer: (
        <FormattedMessage
          defaultMessage="To apply, you must:<ul><li>Have an established audience through at least 1 <strong>active</strong> channel that you own, such as a website, blog, video channel, courses or social media.</li><li>Create original content.</li></ul>"
          description="Answer to the FAQ about requirements for applying as an affiliate"
          id="pyCMaw"
          values={{
            li: (chunks) => <li>{chunks}</li>,
            strong: (chunks) => (
              <strong className="font-medium">{chunks}</strong>
            ),
            ul: (chunks) => (
              <ul className="list-outside list-disc pl-8">{chunks}</ul>
            ),
          }}
        />
      ),
      key: 'requirements',
      question: (
        <FormattedMessage
          defaultMessage="What requirements do I need to meet to apply?"
          description="FAQ about requirements for applying as an affiliate"
          id="FJ0LYY"
        />
      ),
    },
    {
      answer: (
        <FormattedMessage
          defaultMessage="No, signing up as an affiliate is completely free."
          description="Answer to the FAQ if it costs anything to join as an affiliate"
          id="Zq2tuw"
        />
      ),
      key: 'charges',
      question: (
        <FormattedMessage
          defaultMessage="Does it cost anything to join?"
          description="FAQ about whether it costs anything to join as an affiliate"
          id="5kU0WD"
        />
      ),
    },
    {
      answer: (
        <FormattedMessage
          defaultMessage="Our team will carefully review every application. In most cases, applications will be processed within 15 business days. If your application is approved, you will receive an acceptance email into the program."
          description="Answer to the FAQ about the turnaround time for application approval"
          id="2fISDf"
        />
      ),
      key: 'turnaround',
      question: (
        <FormattedMessage
          defaultMessage="How will I know my application has been accepted?"
          description="FAQ about the turnaround time for application approval"
          id="03K4gC"
        />
      ),
    },
    {
      answer: (
        <>
          <FormattedMessage
            defaultMessage="<p>Once accepted into the affiliate program, you will receive a unique reference handle and affiliate link which will be used to track all your referrals.</p>"
            description="Answer to the FAQ about how referrals are tracked"
            id="hwpLbI"
            values={{ p: (chunks) => <p>{chunks}</p> }}
          />
          <FormattedMessage
            defaultMessage="<p>When sharing about GreatFrontEnd with your audience, always use your unique affiliate link.</p>"
            description="Answer to the FAQ about how referrals are tracked"
            id="f/2QqM"
            values={{ p: (chunks) => <p>{chunks}</p> }}
          />
          <FormattedMessage
            defaultMessage="<p>If users use your affiliate link to access our website, an attribution cookie will be added which lasts for 7 days. As long as the user purchases products within the duration of the cookie, you will earn 15% commissions on their first order.</p>"
            description="Answer to the FAQ about how referrals are tracked"
            id="WfqD8P"
            values={{ p: (chunks) => <p>{chunks}</p> }}
          />
        </>
      ),
      key: 'tracking',
      question: (
        <FormattedMessage
          defaultMessage="How are referrals tracked?"
          description="FAQ about how referrals are tracked"
          id="am6Lx2"
        />
      ),
    },
    {
      answer: (
        <FormattedMessage
          defaultMessage="We pay out a commission rate of 15% for all valid first purchases within 7 days of the cookie window, with no limit in terms of the max commission or number of referrals that will be rewarded."
          description="Answer to the FAQ about the commission structure for affiliates"
          id="XZYjaQ"
        />
      ),
      key: 'commissions',
      question: (
        <FormattedMessage
          defaultMessage="What is the commission structure?"
          description="FAQ about the commission structure for affiliates"
          id="lBeTMC"
        />
      ),
    },
    {
      answer: (
        <FormattedMessage
          defaultMessage="You will get paid at the end of every month. Payment is made directly to your PayPal account."
          description="Answer to the FAQ about payment for affiliates"
          id="TfadhY"
        />
      ),
      key: 'paypal',
      question: (
        <FormattedMessage
          defaultMessage="How and when do I get paid?"
          description="FAQ about payment for affiliates"
          id="nJS5qE"
        />
      ),
    },
    {
      answer: (
        <FormattedMessage
          defaultMessage="Yes, our referral program is global. We sell to users in more than 100 countries."
          description="Answer to the FAQ about whether the affiliate program is global"
          id="K7qkc7"
        />
      ),
      key: 'global',
      question: (
        <FormattedMessage
          defaultMessage="Can I participate from outside the US?"
          description="FAQ about whether the affiliate program is global"
          id="uYb9qn"
        />
      ),
    },
  ];

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
