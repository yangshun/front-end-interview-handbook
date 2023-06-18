import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import AmazonLogo from '../icons/AmazonLogo';
import GoogleLogo from '../icons/GoogleLogo';
import MetaLogo from '../icons/MetaLogo';

export default function MarketingHero() {
  const intl = useIntl();

  return (
    <div className="relative overflow-hidden bg-cover">
      <div className="relative pt-0 pb-8 sm:pb-16 md:pb-20">
        <div className={clsx('mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:pt-24')}>
          <div className="text-center">
            <div className="space-y-4 pb-6 text-xs font-medium text-neutral-400 sm:text-sm lg:space-y-5 lg:pb-8 lg:text-sm">
              <p>
                <FormattedMessage
                  defaultMessage="Contributed by ex-interviewers at"
                  description="Text above logos on Hero section of HomePage. To let users know that ex-interviewers at the stated companies have contributed expertise to this platform."
                  id="aQKVD4"
                />
              </p>
              <span className="flex items-center justify-center space-x-6 lg:space-x-8">
                <GoogleLogo
                  className="h-[1.5rem] text-neutral-500 lg:h-[2.1rem]"
                  title={intl.formatMessage({
                    defaultMessage: 'Google logo',
                    description: 'Google company logo',
                    id: 'da4RLj',
                  })}
                />
                <AmazonLogo
                  className="mt-1 h-6 text-neutral-500 lg:mt-2 lg:h-7"
                  title={intl.formatMessage({
                    defaultMessage: 'Amazon logo',
                    description: 'Amazon company logo',
                    id: 'nai6YT',
                  })}
                />
                <MetaLogo
                  className="h-4 text-neutral-500 lg:mb-2 lg:h-5"
                  title={intl.formatMessage({
                    defaultMessage: 'Meta logo',
                    description: 'Meta company logo',
                    id: 'a8ETQr',
                  })}
                />
              </span>
            </div>
            <Heading className="mx-auto max-w-7xl" level="heading1">
              <FormattedMessage
                defaultMessage="The ultimate <span>Front End Interview</span> <span2>preparation platform</span2>."
                description="Title of Hero section on Homepage. To describe the product in 1 line so that users understand it immediately."
                id="8q3l4q"
                values={{
                  span: (chunks) => (
                    <span className="whitespace-nowrap">{chunks}</span>
                  ),
                  span2: (chunks) => (
                    <span className="whitespace-nowrap">{chunks}</span>
                  ),
                }}
              />
            </Heading>
            <Text
              className="mx-auto mt-8 max-w-md text-base sm:text-lg md:mt-12 md:max-w-3xl md:text-xl xl:text-xl"
              color="secondary"
              display="block"
              size="custom">
              <FormattedMessage
                defaultMessage="We help you ace every front end interview by <strong>mastering your fundamentals</strong>. <span>Built by</span> ex-FAANG Senior Front End Engineers."
                description="Subtitle for Hero section on Homepage. Explains in more detail what the product does in order to attract the user to read on."
                id="AGwpnL"
                values={{
                  span: (chunks) => (
                    <span className="whitespace-nowrap">{chunks}</span>
                  ),
                  strong: (chunks) => (
                    <strong className="whitespace-nowrap">{chunks}</strong>
                  ),
                }}
              />
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
