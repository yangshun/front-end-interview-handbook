'use client';

import { FormattedMessage, useIntl } from '~/components/intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Container from '~/components/ui/Container';
import Text from '~/components/ui/Text';

const faqs = [
  {
    answer: (
      <ul className="list-disc space-y-2 pl-4">
        <li>
          <FormattedMessage
            defaultMessage="Upon purchase, you will be sent an email with a preliminary
          questionnaire on your career goals, ideal company profile, background
          and roles."
            description="Answer to 'How does the portfolio review process work?' on the portfolio review FAQ page"
            id="3Xfii+"
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Please answer them and send a copy of your resume and relevant links
          (GitHub, portfolio website) as appropriate"
            description="Answer to 'How does the portfolio review process work?' on the portfolio review FAQ page"
            id="nhpd2+"
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="The portfolio review will occur over email as well as collaborative
          software like Google Docs, up to the number of revisions as per your
          plan."
            description="Answer to 'How does the portfolio review process work?' on the portfolio review FAQ page"
            id="ppF07g"
          />
        </li>
      </ul>
    ),
    id: 'how-it-works',
    question: (
      <FormattedMessage
        defaultMessage="Which medium will the portfolio review be conducted?"
        description="Question on the portfolio review FAQ page"
        id="8Nn1vL"
      />
    ),
  },
  {
    answer: (
      <FormattedMessage
        defaultMessage="This is probably the only service out there where you can get a
        personalized review of your portfolio (and entire career trajectory)
        from senior engineers at big tech. Moreover, we are operating
        specifically in the front end domain, which makes our advice all the
        more specific to what is needed to succeed in this field. This service
        also costs less than 10% of the monthly salary of an entry level front
        end engineer, whilst the recommendations you receive can help you for
        the rest of your career - not just the initial job hunt."
        description="Answer to 'Why should I buy this?' on the portfolio review FAQ page"
        id="eA+jmb"
      />
    ),
    id: 'why-should-i-buy',
    question: (
      <FormattedMessage
        defaultMessage="Why should I buy this?"
        description="Question on the portfolio review FAQ page"
        id="3J7i+K"
      />
    ),
  },
  {
    answer: (
      <FormattedMessage
        defaultMessage="Yes; we have provided mentorship to help individuals transition from
        other fields into the front end domain."
        description="Answer to 'Is this relevant to me?' on the portfolio review FAQ page"
        id="fk+HBC"
      />
    ),
    id: 'is-this-relevant',
    question: (
      <FormattedMessage
        defaultMessage="I'm an aspiring front end engineer. Will this still be relevant to me?"
        description="Question on the portfolio review FAQ page"
        id="OdhcdZ"
      />
    ),
  },
];

export default function ResumeReviewFAQs() {
  const intl = useIntl();

  return (
    <div className="bg-neutral-950 py-16 lg:py-24 xl:py-32">
      <Container width="marketing">
        <h2 className="text-3xl font-bold text-white sm:text-4xl sm:leading-none sm:tracking-tight">
          {intl.formatMessage({
            defaultMessage: 'Frequently Asked Questions',
            description: 'Title of the FAQ section',
            id: 'nf8QTa',
          })}
        </h2>
        <Accordion className="mt-10" type="multiple">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <Text className="block" color="secondary" size="body1">
                  {faq.answer}
                </Text>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}
