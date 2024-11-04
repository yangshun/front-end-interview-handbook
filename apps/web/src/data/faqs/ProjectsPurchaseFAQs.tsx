import { FormattedMessage } from '~/components/intl';
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
      defaultMessage="Do unspent GreatFrontEnd Projects credits roll over?"
      description="Question on projects pricing's FAQ section - unused credits"
      id="YOv8Qc"
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
      id="oSEF7X"
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
      defaultMessage="Are there student discounts available for GreatFrontEnd Projects?"
      description="Question on projects pricing's FAQ section - student discounts"
      id="IxaZ5e"
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
      defaultMessage="Do you offer refunds for GreatFrontEnd Projects?"
      description="Question on projects pricing's FAQ section - offer refunds"
      id="ltBiLe"
    />
  ),
};

export const subscriptionCancel: FAQItem = {
  answer: (
    <>
      You can cancel your GreatFrontEnd Projects subscription anytime by
      visiting the{' '}
      <Anchor href="/projects/settings/billing">Settings &gt; Billing</Anchor>{' '}
      page. Your subscription will remain active until the end of your current
      subscription period and will not be renewed after it ends.
    </>
  ),
  key: 'purchase-subscription-cancel',
  question: (
    <>Where and how do I cancel my GreatFrontEnd Projects subscription?</>
  ),
};

export const purchaseSubscriptionRenew: FAQItem = {
  answer: (
    <>
      Yes, the recurring subscriptions are automatically renewed at the end of
      its period for the convenience of subscribers. Monthly plans are renewed
      every month and annual plans are renewed every year. An email reminder
      will be sent days before the subscription is renewed to give you ample
      time to cancel if you do not intend to renew.
    </>
  ),
  key: 'purchase-subscription-renew',
  question: (
    <>Are GreatFrontEnd Projects subscriptions automatically renewed?</>
  ),
};

export const interviewsAccess: FAQItem = {
  answer: (
    <>
      GreatFrontEnd Interviews is a separate product targeted at a different
      audience. The memberships and access for these two products are
      independent.
    </>
  ),
  key: 'interviews-access',
  question: (
    <>
      Do I get access to GreatFrontEnd Interviews' premium features by
      purchasing GreatFrontEnd Projects premium?
    </>
  ),
};
