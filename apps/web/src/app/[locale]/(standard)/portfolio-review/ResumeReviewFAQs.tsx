'use client';

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
          Upon purchase, you will be sent an email with a preliminary
          questionnaire on your career goals, ideal company profile, background
          and roles.
        </li>
        <li>
          Please answer them and send a copy of your resume and relevant links
          (GitHub, portfolio website) as appropriate
        </li>
        <li>
          The portfolio review will occur over email as well as collaborative
          software like Google Docs, up to the number of revisions as per your
          plan.
        </li>
      </ul>
    ),
    id: 'how-it-works',
    question: <>Which medium will the portfolio review be conducted?</>,
  },
  {
    answer: (
      <>
        This is probably the only service out there where you can get a
        personalized review of your portfolio (and entire career trajectory)
        from senior engineers at big tech. Moreover, we are operating
        specifically in the front end domain, which makes our advice all the
        more specific to what is needed to succeed in this field. This service
        also costs less than 10% of the monthly salary of an entry level front
        end engineer, whilst the recommendations you receive can help you for
        the rest of your career - not just the initial job hunt.
      </>
    ),
    id: 'why-should-i-buy',
    question: <>Why should I buy this?</>,
  },
  {
    answer: (
      <>
        Yes; we have provided mentorship to help individuals transition from
        other fields into the front end domain.
      </>
    ),
    id: 'is-this-relevant',
    question: (
      <>
        I'm an aspiring front end engineer. Will this still be relevant to me?
      </>
    ),
  },
];

export default function ResumeReviewFAQs() {
  return (
    <div className="bg-neutral-950 py-16 lg:py-24 xl:py-32">
      <Container width="3xl">
        <h2 className="text-3xl font-bold text-white sm:text-4xl sm:leading-none sm:tracking-tight">
          Frequently Asked Questions
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
