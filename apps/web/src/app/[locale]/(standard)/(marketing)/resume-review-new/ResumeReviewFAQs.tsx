'use client';

import Container from '~/components/ui/Container';

import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/solid';

const faqs = [
  {
    answer: (
      <ul className="list-inside list-disc space-y-2">
        <li>
          Upon purchase, you will be sent an email with a preliminary
          questionnaire on your career goals, ideal company profile, background
          and roles.
        </li>
        <li>
          Please answer them and send a copy of your resume and relevant links
          (github, portfolio website) as appropriate
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
        Yes; we have provided mentorship to help individuals transit from other
        fields into the front end domain.
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
    <div className="bg-gray-900">
      <Container>
        <div className="mx-auto max-w-2xl divide-y divide-white/10 py-32 lg:max-w-none xl:py-40 ">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.id} as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              aria-hidden="true"
                              className="h-6 w-6"
                            />
                          ) : (
                            <PlusSmallIcon
                              aria-hidden="true"
                              className="h-6 w-6"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-300">
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
