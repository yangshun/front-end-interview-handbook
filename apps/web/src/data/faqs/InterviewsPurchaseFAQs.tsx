import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';

import type { FAQItem } from './FAQs';

export const purchaseOptions: FAQItem = {
  answer: (
    <ul>
      <li>
        <FormattedMessage
          defaultMessage="<strong>Subscription</strong>: You will be billed a fixed amount at the
        start of every period according to your selected plan. You can choose to
        cancel anytime."
          description="Answer to 'What are the various options to purchase GreatFrontEnd Interviews premium?' on Purchase's FAQ sections"
          id="aCS7aj"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </li>
      <li>
        <FormattedMessage
          defaultMessage="<strong>Lifetime</strong>: A one-time payment, with no recurring
        subscription fees. You get access to all the content in GreatFrontEnd's
        Interviews platform forever, along with any future updates. This will be
        useful and relevant for your current and future job hunts."
          description="Answer to 'What are the various options to purchase GreatFrontEnd Interviews premium?' on Purchase's FAQ sections"
          id="pHyeeT"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </li>
    </ul>
  ),
  key: 'purchase-options',
  question: (
    <FormattedMessage
      defaultMessage="What are the various options to purchase GreatFrontEnd Interviews premium?"
      description="Question on Purchase's FAQ section - on the various pricing plans available on the interview platform"
      id="eI+uaS"
    />
  ),
};

export const purchaseLifetimeAccess: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage="It is a <strong>one-time purchase, with no recurring subscription</strong>. You get access to all the content on the GreatFrontEnd Interviews platform forever, along with any future updates. This will be useful and relevant for all future job hunts."
      description="Answer to 'What does lifetime access mean?' on Purchase's FAQ sections"
      id="iGdqEi"
      values={{
        strong: (chunks) => <strong className="font-medium">{chunks}</strong>,
      }}
    />
  ),
  key: 'purchase-lifetime-access',
  question: (
    <FormattedMessage
      defaultMessage='What does "lifetime access" to GreatFrontEnd Interviews mean?'
      description="Question on Purchase's FAQ section - on the scope of the lifetime access pricing plan on the interview platform"
      id="8bvYir"
    />
  ),
};

export const purchaseLifetimeExpensive: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="The lifetime plan costs the most but we can assure you it is worth the
        money if you are serious about improving your interview skills and
        landing the job. With a GreatFrontEnd Interviews lifetime membership,
        your premium status will never expire and you retain access to all
        premium interviews content, including future updates."
          description="Answer to 'GreatFrontEnd Interviews' lifetime plan seems expensive!' on Purchase's FAQ sections"
          id="HpWXN+"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="No other platforms offer a lifetime membership and you have to pay every
        time you are job hunting. Consider the number of times you need to job
        hunt in the span of your career. Your lifetime membership will be worth
        it because you can use it for all your future job hunts. If you divide
        the cost by the number of months you will be using it for, the monthly
        cost is very very low."
          description="Answer to 'GreatFrontEnd Interviews' lifetime plan seems expensive!' on Purchase's FAQ sections"
          id="UrDgFx"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Moreover, we are constantly adding content and prices will increase as
        the amount of content increases. You can lock in access to all premium
        interviews content by purchasing the lifetime plan today."
          description="Answer to 'GreatFrontEnd Interviews' lifetime plan seems expensive!' on Purchase's FAQ sections"
          id="1SL96K"
        />
      </p>
    </>
  ),
  key: 'purchase-lifetime-expensive',
  question: (
    <FormattedMessage
      defaultMessage="GreatFrontEnd Interviews' lifetime plan seems expensive!"
      description="Question on Purchase's FAQ section - on the pricing of the lifetime access plan on the interview platform"
      id="6VmHj1"
    />
  ),
};

export const purchaseDiscounts: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage=" We have seasonal discounts and all-year long student discounts which you
      can find on the <link>promotions</link> page.
      Additionally, we offer a 100% cashback reward if you post an honest public
      review about the platform. Find more details about the <link>cashback program</link>."
      description="Answer to 'Do you offer discounts for GreatFrontEnd Interviews?' on Purchase's FAQ sections"
      id="zhQt1x"
      values={{
        link: (chunks) => <Anchor href="/promotions">{chunks}</Anchor>,
      }}
    />
  ),
  key: 'purchase-discounts',
  question: (
    <FormattedMessage
      defaultMessage="Do you offer discounts for GreatFrontEnd Interviews?"
      description="Question on Purchase's FAQ section - on the availability of discounts on the interview platform"
      id="fwJtUV"
    />
  ),
};

export const purchaseRefund: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage='We have a "fair use" refund policy within 7 days of starting your first
      subscription. "Fair use" means that if you have accessed a significant
      amount of premium interview content (more than 5 premium content pieces),
      we reserve the right to reject the request for a refund. To request a
      refund, send an email to {contactEmail}.'
      description="Answer to 'What's the refund policy for GreatFrontEnd Interviews?' on Purchase's FAQ sections"
      id="nmG3eE"
      values={{
        contactEmail: 'contact[at]greatfrontend.com',
      }}
    />
  ),
  key: 'purchase-refund',
  question: (
    <FormattedMessage
      defaultMessage="What's the refund policy for GreatFrontEnd Interviews?"
      description="Question on Purchase's FAQ section - on the refund policy on the interview platform"
      id="4F2QPV"
    />
  ),
};

export const purchaseSubscriptionRenew: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage="Yes, with the exception of the lifetime plan, all recurring subscriptions
      are automatically renewed at the end of its period for the convenience of
      subscribers. Monthly plans are renewed every month, quarterly plans
      renewed every 3 months, annual plans are renewed every year. An email
      reminder will be sent days before the subscription is renewed to give you
      ample time to cancel if you do not intend to renew."
      description="Answer to 'Are GreatFrontEnd Interviews subscriptions automatically renewed?' on Purchase's FAQ sections"
      id="XdEDHU"
    />
  ),
  key: 'purchase-subscription-renew',
  question: (
    <FormattedMessage
      defaultMessage="Are GreatFrontEnd Interviews subscriptions automatically renewed?"
      description="Question on Purchase's FAQ section - on the automatic renewal of the subscription on the interview platform"
      id="xTtoUJ"
    />
  ),
};

export const purchaseSubscriptionCancel: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage="You can cancel your GreatFrontEnd Interviews subscription anytime by
      visiting the <link>Profile > Billing</link> page. Your subscription will remain active until the end of your current
      subscription period and will not be renewed after it ends."
      description="Answer to 'Where and how do I cancel my GreatFrontEnd Interviews subscription?' on Purchase's FAQ sections"
      id="DFNDlQ"
      values={{
        link: (chunks) => <Anchor href="/profile/billing">{chunks}</Anchor>,
      }}
    />
  ),
  key: 'purchase-subscription-cancel',
  question: (
    <FormattedMessage
      defaultMessage="Where and how do I cancel my GreatFrontEnd Interviews subscription?"
      description="Question on Purchase's FAQ section - on the process of cancelling the subscription on the interview platform"
      id="oQOZBb"
    />
  ),
};

export const purchaseSubscriptionCancelled: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage="When your GreatFrontEnd Interviews subscription ends, you will not be able
      to access premium interview content on the platform."
      description="Answer to 'What happens when my GreatFrontEnd Interviews subscription is cancelled?' on Purchase's FAQ sections"
      id="uoeVHT"
    />
  ),
  key: 'purchase-subscription-cancel-what-happen',
  question: (
    <FormattedMessage
      defaultMessage="What happens when my GreatFrontEnd Interviews subscription is cancelled?"
      description="Question on Purchase's FAQ section - on the consequences of cancelling the subscription on the interview platform"
      id="hVXgt2"
    />
  ),
};

export const purchaseIssues: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="This is a common issue faced by customers from India and Indonesia
        because some card providers block overseas transactions. If you are sure
        your payment details are valid, you might want to call your bank and
        check if they are the ones blocking the payment. Many of our users have
        resolved the issue by calling up their bank and allowing international
        transactions."
          description="Answer to 'I am facing issues (e.g. payment declined) when checking out' on Purchase's FAQ sections"
          id="BV5zYu"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="If the issue persists, shoot us a email at {contactEmail}."
          description="Answer to 'I am facing issues (e.g. payment declined) when checking out' on Purchase's FAQ sections"
          id="h1iPiG"
          values={{
            contactEmail: 'contact[at]greatfrontend.com',
          }}
        />
      </p>
    </>
  ),
  key: 'purchase-issues',
  question: (
    <FormattedMessage
      defaultMessage="I am facing issues (e.g. payment declined) when checking out"
      description="Question on Purchase's FAQ section - on the common issues faced during the purchase process on the interview platform"
      id="brT+kn"
    />
  ),
};

export const projectsAccess: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage="GreatFrontEnd Projects is a separate product targeted at a different
      audience. The memberships and access for these two products are
      independent. There is also currently no lifetime premium membership for
      GreatFrontEnd Projects."
      description="Answer to 'Do I get access to GreatFrontEnd Projects' premium features by purchasing GreatFrontEnd Interviews premium?' on Purchase's FAQ sections"
      id="Tdz722"
    />
  ),
  key: 'projects-access',
  question: (
    <FormattedMessage
      defaultMessage="Do I get access to GreatFrontEnd Projects' premium features by purchasing
      GreatFrontEnd Interviews premium?"
      description="Question on Purchase's FAQ section - on the access to other products by purchasing the interview platform"
      id="RzicB4"
    />
  ),
};
