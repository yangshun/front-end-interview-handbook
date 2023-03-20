import { useId, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading from '~/components/ui/Heading';

export default function MarketingEmailSubscribe() {
  const emailId = useId();
  const intl = useIntl();
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  return (
    <div className="mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="bg-brand-600 relative overflow-hidden rounded-2xl px-6 py-10 shadow-xl sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
          <svg
            className="absolute inset-0 h-full w-full"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1463 360"
            xmlns="http://www.w3.org/2000/svg">
            <path
              className="text-brand-500 text-opacity-40"
              d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              fill="currentColor"
            />
            <path
              className="text-brand-700 text-opacity-40"
              d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="relative">
          <div className="sm:text-center">
            <Heading className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              <FormattedMessage
                defaultMessage="Get notified about new front end resources, interview tips and practice questions"
                description="Title for newsletter sign up section"
                id="ePyk/V"
              />
            </Heading>
            <p className="text-brand-200 mx-auto mt-6 max-w-2xl text-lg">
              <FormattedMessage
                defaultMessage="Sign up for our newsletter and join our community of passionate <span>Front End Engineers</span>."
                description="Subtitle text for newsletter sign up section"
                id="+pieds"
                values={{
                  span: (chunks) => (
                    <span className="whitespace-nowrap">{chunks}</span>
                  ),
                }}
              />
            </p>
          </div>
          <form
            className="mt-12 sm:mx-auto sm:flex sm:max-w-lg"
            onSubmit={async (event) => {
              event.preventDefault();
              event.stopPropagation();

              const data = new FormData(event.target as HTMLFormElement);

              const response = await fetch('/api/marketing/email-signup', {
                body: JSON.stringify({
                  email: data.get('email') as string,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              });

              const result = await response.json();

              setSubmitMessage(result.message);
            }}>
            <div className="min-w-0 flex-1">
              <label className="sr-only" htmlFor={emailId}>
                <FormattedMessage
                  defaultMessage="Email Address"
                  description="Label for email address input field"
                  id="GJB3/X"
                />
              </label>
              <input
                autoComplete="email"
                className="focus:ring-offset-brand-600 block w-full rounded-md border border-transparent px-5 py-3 text-base text-slate-900 placeholder-slate-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                id={emailId}
                name="email"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Enter your email',
                  description: 'Placeholder text for email input field',
                  id: 'JKBRGr',
                })}
                type="email"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-3">
              <button
                className="bg-brand-500 hover:bg-brand-400 focus:ring-offset-brand-600 block w-full rounded-md border border-transparent px-5 py-3 text-base font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:px-10"
                type="submit">
                {intl.formatMessage({
                  defaultMessage: 'Notify Me',
                  description:
                    'Button label for a newsletter subscription section',
                  id: 'ryCcOP',
                })}
              </button>
            </div>
          </form>
          <p className="mt-3 h-6 text-center text-white">{submitMessage}</p>
        </div>
      </div>
    </div>
  );
}
