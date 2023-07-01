import { FormattedMessage } from 'react-intl';

import type { FAQItem } from './FAQs';

export const buying: FAQItem = {
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
};

export const questions: FAQItem = {
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
};

export const worthIt: FAQItem = {
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
};

export const seniority: FAQItem = {
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
};

export const lifetimeAccess: FAQItem = {
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
};

export const freeUpdates: FAQItem = {
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
};
