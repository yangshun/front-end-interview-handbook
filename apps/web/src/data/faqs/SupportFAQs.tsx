import { FormattedMessage } from '~/components/intl';

import type { FAQItem } from './FAQs';

export const supportTechnical: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage="We offer support if you face issues with using the website or need help
      with account management or payment related concerns. Technical questions
      regarding concepts or code can be asked in our public and private Discord
      servers where our active community members are happy to help."
      description="Answer to 'Do you offer technical support?' on support FAQs"
      id="6Q/4BV"
    />
  ),
  key: 'support-technical',
  question: (
    <FormattedMessage
      defaultMessage="Do you offer technical support?"
      description="Questions on support FAQ section - on the offering of technical support"
      id="V5DoLK"
    />
  ),
};

export const supportHow: FAQItem = {
  answer: (
    <FormattedMessage
      defaultMessage="You can ask your question in our Discord community servers or send an
      email to {email}"
      description="Answer to 'How do I get support?' on support FAQs"
      id="JNqp7O"
      values={{ email: 'contact@greatfrontend.com.' }}
    />
  ),
  key: 'support-how',
  question: (
    <FormattedMessage
      defaultMessage="How do I get support?"
      description="Question on support FAQ section - on how to get support"
      id="hmLtry"
    />
  ),
};
