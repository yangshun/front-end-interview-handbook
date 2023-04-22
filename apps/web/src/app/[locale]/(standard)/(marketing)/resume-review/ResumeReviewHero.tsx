'use client';

import Button from '~/components/ui/Button';

import { CheckIcon } from '@heroicons/react/20/solid';

const includedFeatures = [
  <>
    Resume review will take place over email exchange and Google Docs. No need
    to take notes over a Zoom call
  </>,
  <>
    Receive personalized, detailed and actionable suggestions from actual
    industry veterans, not non-technical resume writers
  </>,
  <>
    Review is customized according to your ideal job position and target level
  </>,
  <>
    Unlimited revisions within 6 months of initial contact. Ask as many burning
    questions as you have and we'll answer them
  </>,
];

import logMessage from '~/logging/logMessage';

export default function ResumeReviewHero() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-3xl sm:text-center">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Elevate your Front End Engineering Resume
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Get valuable insights on your resume with 1-to-1 guidance from
          <br className="hidden sm:inline" />{' '}
          <strong className="font-medium">
            ex-FAANG Senior Front End Engineers
          </strong>
        </p>
      </div>
      <div className="relative mx-auto mt-16 max-w-2xl rounded-3xl bg-white ring-1 ring-slate-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
        <div className="p-8 sm:p-10 lg:flex-auto">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            Resume Review
          </h3>
          <p className="mt-6 text-base leading-7 text-slate-600">
            Tell us about yourself, roles you are targeting, and send us your
            resume. We'll do the rest.
          </p>
          <div className="mt-10 flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
              What's included
            </h4>
            <div className="h-px flex-auto bg-slate-100" />
          </div>
          <ul
            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-slate-600 sm:grid-cols-2 sm:gap-6"
            role="list">
            {includedFeatures.map((feature, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index} className="flex gap-x-3">
                <CheckIcon
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-indigo-600"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="-mt-2 p-3 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="h-full rounded-2xl bg-slate-50 py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="text-base font-medium text-slate-600">
                Only 5 slots a week
              </p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-slate-900">
                  $400
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-slate-600">
                  USD
                </span>
              </p>
              <Button
                className="mt-10"
                display="block"
                href="https://book.stripe.com/4gw3gdgYv6IZgyQfYZ"
                label="Book your Slot"
                variant="special"
                onClick={() => {
                  logMessage({
                    level: 'info',
                    message: 'Checkout attempt for resume review',
                    title: 'Checkout attempt',
                  });
                }}
              />
              <p className="mt-6 text-xs leading-5 text-slate-600">
                Invoices and receipts available for easy company reimbursement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
