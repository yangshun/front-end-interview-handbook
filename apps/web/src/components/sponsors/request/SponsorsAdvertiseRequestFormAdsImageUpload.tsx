import clsx from 'clsx';

import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

export default function SponsorsAdvertiseRequestFormAdsImageUpload() {
  return (
    <div className="flex flex-col gap-2">
      <Label
        description="Upload your ad image"
        label="Ad asset"
        required={true}
      />
      <div
        className={clsx(
          'flex w-full flex-col items-center justify-center',
          'py-10',
          ['border', themeBorderEmphasizeColor, 'border-dashed'],
          'rounded-md',
          themeBackgroundCardColor,
        )}>
        <Text className="block" color="subtitle" size="body2">
          Select or drop an image here
        </Text>
        <Text className="mt-1 block" color="secondary" size="body3">
          100px x 200px
        </Text>
      </div>
    </div>
  );
}
