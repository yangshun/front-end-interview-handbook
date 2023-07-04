'use client';

import clsx from 'clsx';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

import Container from '~/components/ui/Container';

import { Disclosure } from '@headlessui/react';

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
    id: 'why-should-i-buy',
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
      <Container variant="3xl">
        <div className="divide-y divide-white/10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl sm:leading-none sm:tracking-tight">
            Frequently Asked Questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.id} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button
                        className={clsx(
                          'flex w-full items-start justify-between text-left text-white',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
                          'focus-visible:ring-brand-dark dark:focus-visible:ring-brand',
                        )}>
                        <span className="text-lg font-medium leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <RiSubtractLine
                              aria-hidden="true"
                              className="h-6 w-6"
                            />
                          ) : (
                            <RiAddLine aria-hidden="true" className="h-6 w-6" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-4 pr-12">
                      <p className="text-base leading-7 text-neutral-300">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
