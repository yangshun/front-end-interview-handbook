import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';

import type { FAQItem } from './FAQs';

export const purchaseOptions: FAQItem = {
  answer: (
    <ul>
      <li>
        <strong>Subscription</strong>: You will be billed a fixed amount at the
        start of every period according to your selected plan. You can choose to
        cancel anytime.
      </li>
      <li>
        <strong>Lifetime</strong>: A one-time purchase, with no recurring
        subscription fees. You get access to all the content in GreatFrontEnd's
        interview platform forever, along with any future updates. This will be
        useful and relevant for all future job hunts.
      </li>
    </ul>
  ),
  key: 'purchase-options',
  question: <>What are the various options to purchase Premium?</>,
};

export const purchaseLifetimeAccess: FAQItem = {
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
  key: 'purchase-lifetime-access',
  question: (
    <FormattedMessage
      defaultMessage='What does "lifetime access" mean?'
      description="Question on Homepage's FAQ section - on the scope of the lifetime access pricing plan on the interview platform"
      id="2YMuJe"
    />
  ),
};

export const purchaseLifetimeExpensive: FAQItem = {
  answer: (
    <>
      <p>
        The lifetime plan costs the most but we can assure you it is worth the
        money if you are serious about improving your interview skills and
        landing the job. With a lifetime membership, your premium status will
        never expire and you retain access to all premium content on the
        interview platform, including receiving updates.
      </p>
      <p>
        No other platforms offer a lifetime membership and you have to pay every
        time you are job hunting. Consider the number of times you need to job
        hunt in the span of your career. Your lifetime membership will be worth
        it because you can use it for all your future job hunts. If you divide
        the cost by the number of months you can use it for, the monthly cost is
        very very low.
      </p>
      <p>
        Moreover, we are constantly adding content and prices will increase as
        the amount of content increases. You can lock in access to all premium
        content by purchasing the lifetime plan today.
      </p>
    </>
  ),
  key: 'purchase-lifetime-expensive',
  question: <>The lifetime plan seems expensive!</>,
};

export const purchaseDiscounts: FAQItem = {
  answer: (
    <>
      We have seasonal discounts and all-year long student discounts which you
      can find on the <Anchor href="/promotions">promotions</Anchor> page.
      Additionally, we offer a 100% cashback reward if you post an honest public
      review about the platform. Find more details about the{' '}
      <Anchor href="/promotions">cashback program</Anchor>.
    </>
  ),
  key: 'purchase-discounts',
  question: <>Do you offer discounts?</>,
};

export const purchaseRefund: FAQItem = {
  answer: (
    <>
      We have a "fair use" refund policy within 14 days of starting your first
      subscription. "Fair use" means that if you have accessed a significant
      amount of premium content (more than 10 premium questions/solutions), we
      reserve the right to reject the request for a refund. To request a refund,
      send an email to contact[at]greatfrontend.com.
    </>
  ),
  key: 'purchase-refund',
  question: <>What's the refund policy?</>,
};

export const purchaseSubscriptionRenew: FAQItem = {
  answer: (
    <>
      Yes, subscriptions are automatically renewed at the end of its period for
      the convenience of subscribers. Monthly plans are renewed every month,
      quarterly plans renewed every 3 months, and so on. An email reminder will
      be sent days before the subscription is renewed to give you ample time to
      cancel if you do not intend to renew.
    </>
  ),
  key: 'purchase-subscription-renew',
  question: <>Are subscriptions automatically renewed?</>,
};

export const purchaseSubscriptionCancel: FAQItem = {
  answer: (
    <>
      You can cancel your subscription anytime by visiting the Profile &gt;
      Billing page. Your subscription will remain active until the end of your
      current subscription period and will not be renewed after it ends.
    </>
  ),
  key: 'purchase-subscription-cancel',
  question: <>Where and how do I cancel my subscription?</>,
};

export const purchaseSubscriptionCancelled: FAQItem = {
  answer: (
    <>
      When your subscription stops, you will not be able to access premium
      content on the platform.
    </>
  ),
  key: 'purchase-subscription-cancel-what-happen',
  question: <>What happens when my subscription is cancelled?</>,
};

export const purchaseIssues: FAQItem = {
  answer: (
    <>
      <p>
        This is a common issue faced by customers from India and Indonesia
        because some card providers block overseas transactions. If you are sure
        your payment details are valid, you might want to call your bank and
        check if they are the ones blocking the payment. Many of our users have
        resolved the issue by calling up their bank and allowing international
        transactions.
      </p>
      <p>
        If the issue persists, shoot us a email at contact[at]greatfrontend.com.
      </p>
    </>
  ),
  key: 'purchase-issues',
  question: <>I am facing issues (e.g. payment declined) when checking out</>,
};
