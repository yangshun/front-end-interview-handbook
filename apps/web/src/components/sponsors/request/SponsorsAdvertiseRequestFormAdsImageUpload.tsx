import clsx from 'clsx';

import { FormattedMessage, useIntl } from '~/components/intl';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import {
  themeBackgroundInputColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  heightConstraint: number;
  widthConstraint: number;
}>;

export default function SponsorsAdvertiseRequestFormAdsImageUpload({
  widthConstraint,
  heightConstraint,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-2">
      <Label
        description={intl.formatMessage({
          defaultMessage: 'Follow the image dimensions guidelines',
          description: 'Description for ad asset',
          id: 'Y8acmz',
        })}
        label={intl.formatMessage({
          defaultMessage: 'Ad asset',
          description: 'Label for ad image',
          id: 'vWBErz',
        })}
        required={true}
      />
      <div
        className={clsx(
          'flex w-full flex-col items-center justify-center',
          'py-10',
          ['border', themeBorderEmphasizeColor, 'border-dashed'],
          'rounded-md',
          themeBackgroundInputColor,
        )}>
        <Text className="block" color="subtitle" size="body2">
          <FormattedMessage
            defaultMessage="Select or drop an image here"
            description="Ad image upload description"
            id="EfUaYk"
          />
        </Text>
        <Text className="mt-1 block" color="secondary" size="body3">
          {widthConstraint}px x {heightConstraint}px (
          {widthConstraint / heightConstraint}:1 ratio)
        </Text>
      </div>
    </div>
  );
}
