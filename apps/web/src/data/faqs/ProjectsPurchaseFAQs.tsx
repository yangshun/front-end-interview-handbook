import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';

import type { FAQItem } from './FAQs';

export const unspentCredits: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="Yes, rest assured that unspent credits will roll over to the next month or year and never expire."
          description="Answer on projects pricing's FAQ section - unused credits"
          id="L15VNt"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Since annual users have unlimited credits, we will roll over credits for projects that remain locked at the end of their subscription cycle."
          description="Answer on projects pricing's FAQ section - unused credits"
          id="0z/V+d"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="However, note that credits can only be spent when you are an active premium member."
          description="Answer on projects pricing's FAQ section - unused credits"
          id="zF6est"
        />
      </p>
    </>
  ),
  key: 'unspent-credits',
  question: (
    <FormattedMessage
      defaultMessage="Do unspent credits roll over?"
      description="Question on projects pricing's FAQ section - unused credits"
      id="CjH8DZ"
    />
  ),
};

export const studentDiscounts: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage="We currently offer student discounts at up to 40% off plans if you sign in
      / up with your .edu student email account. Alumni are excluded from this
      discount. Please read more at our <link>Student Discount Terms and Conditions</link>."
      description="Answer on projects pricing's FAQ section - student discounts"
      id="u/YBSN"
      values={{
        link: (chunks) => (
          <Anchor
            className="whitespace-nowrap"
            href="/legal/student-discount"
            weight="medium">
            {chunks}
          </Anchor>
        ),
      }}
    />
  ),
  key: 'student-discounts',
  question: (
    <FormattedMessage
      defaultMessage="Are there student discounts available?"
      description="Question on projects pricing's FAQ section - student discounts"
      id="VrTcVl"
    />
  ),
};

export const institutionsOrgDiscounts: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage="We offer bulk discounts at attractive rates for group trainings. Please send an email to <link>institutions@greatfrontend.com</link> with your company email and address, and we would be happy to assist."
      description="Answer on projects pricing's FAQ section - institutions and organizations discounts"
      id="nL4iPh"
      values={{
        link: (chunks) => (
          <Anchor
            className="whitespace-nowrap"
            href="mailto:institutions@greatfrontend.com"
            weight="medium">
            {chunks}
          </Anchor>
        ),
      }}
    />
  ),
  key: 'institution-org-discount',
  question: (
    <FormattedMessage
      defaultMessage="Are there discounts available for institutions and organizations?"
      description="Question on projects pricing's FAQ section - institutions and organizations discounts"
      id="qNqNCX"
    />
  ),
};

export const offerRefunds: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage={`We provide a refund policy based on the principle of "fair use" during the initial 14-day period of your first subscription. The concept of fair use implies that if you download a couple of premium assets such as designs or premium challenges and realize that our service isn't suitable for you, we are more than happy to process a refund. However, if you download three or more premium assets and then request a refund, we retain the right to decline your request. To initiate a refund, please send an email to <link>projects@greatfrontend.com</link> within 14 days of commencing your subscription.`}
      description="Answer on projects pricing's FAQ section - offer refunds"
      id="MVgsuv"
      values={{
        link: (chunks) => (
          <Anchor
            className="whitespace-nowrap"
            href="mailto:projects@greatfrontend.com"
            weight="medium">
            {chunks}
          </Anchor>
        ),
      }}
    />
  ),
  key: 'offer-refund',
  question: (
    <FormattedMessage
      defaultMessage="Do you offer refunds?"
      description="Question on projects pricing's FAQ section - offer refunds"
      id="AwOPCW"
    />
  ),
};

export const cancelSubscription: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage='You can easily cancel your subscription at any time in the "Billing" tab of the "Settings" page. The subscription and your access to premium contents will only end at the end of the current billing period (not immediately).'
      description="Answer on projects pricing's FAQ section - cancel subscription"
      id="ZC3dbI"
    />
  ),
  key: 'cancel-subscription',
  question: (
    <FormattedMessage
      defaultMessage="Can I cancel my subscription any time?"
      description="Question on projects pricing's FAQ section - cancel subscription"
      id="gdu/01"
    />
  ),
};

export const autoRenew: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage='Yes, our subscription auto-renews at the end of each billing period. An email reminder will be sent a few days before that so you can cancel it if you wish from the "Billing" tab of the "Settings" page.'
      description="Answer on projects pricing's FAQ section - auto renew"
      id="Vge6qx"
    />
  ),
  key: 'auto-renew',
  question: (
    <FormattedMessage
      defaultMessage="Does the subscription auto-renew?"
      description="Question on projects pricing's FAQ section - auto renew"
      id="Db9ssR"
    />
  ),
};
