import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeGradientHeading,
  themeMarketingHeadingSize,
} from '~/components/ui/theme';

import SponsorsBookDemoButton from './SponsorsBookDemoButton';

export default function SponsorsTrialPriceSection() {
  return (
    <div className={clsx('flex flex-col gap-6', 'py-16 sm:py-20')}>
      <Heading
        className={clsx(
          themeGradientHeading,
          themeMarketingHeadingSize,
          'max-w-3xl',
        )}
        level="custom"
        tag="p"
        weight="medium">
        <FormattedMessage
          defaultMessage="Unlock massive first-week discounts – Risk free"
          description="Advertise with us section title"
          id="so4j4G"
        />
      </Heading>
      <Text
        className={clsx('tex-base lg:text-lg', 'max-w-[634px]')}
        color="secondary"
        size="inherit"
        weight="medium">
        <FormattedMessage
          defaultMessage="Try sponsoring GreatFrontEnd with a heavily discounted first week. Test how well your brand performs with our audience and track real ROI before making a bigger commitment. No contracts. Just performance."
          description="Advertise with us section subtitle"
          id="taddhu"
        />
      </Text>
      <div className="flex flex-col items-center gap-3 sm:items-start">
        <SponsorsBookDemoButton className="w-full sm:w-auto" size="md" />
        <Text color="secondary" size="body3">
          <FormattedMessage
            defaultMessage="No commitment required"
            description="No commitment required text"
            id="JFgF3m"
          />
        </Text>
      </div>
    </div>
  );
}
