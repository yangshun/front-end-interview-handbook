import type { FAQItem } from './FAQs';

export const supportTechnical: FAQItem = {
  answer: (
    <>
      We offer support if you face issues with using the website or need help
      with account management or payment related concerns. Technical questions
      regarding concepts or code can be asked in our public and private Discord
      servers where our active community members are happy to help.
    </>
  ),
  key: 'support-technical',
  question: <>Do you offer technical support?</>,
};

export const supportHow: FAQItem = {
  answer: (
    <>
      You can ask your question in our Discord community servers or send an
      email to contact@greatfrontend.com.
    </>
  ),
  key: 'support-how',
  question: <>How do I get support?</>,
};
