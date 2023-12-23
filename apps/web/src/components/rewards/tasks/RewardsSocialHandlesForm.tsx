import clsx from 'clsx';

import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeDivideColor } from '~/components/ui/theme';

export default function RewardsSocialHandlesForm() {
  return (
    <div className={clsx('w-full divide-y', themeDivideColor)}>
      <div className="flex justify-between items-center gap-4 py-4">
        <Text size="body2">GitHub</Text>{' '}
        <div className="max-w-sm w-full">
          <TextInput
            isLabelHidden={true}
            label="GitHub"
            placeholder="@johndoe"
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 py-4">
        <Text size="body2">Twitter</Text>{' '}
        <div className="max-w-sm w-full">
          <TextInput
            className="w-full"
            isLabelHidden={true}
            label="Twitter"
            placeholder="@johndoe"
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 py-4">
        <Text size="body2">LinkedIn</Text>
        <div className="max-w-sm w-full">
          <TextInput
            isLabelHidden={true}
            label="LinkedIn"
            placeholder="https://linkedin.com/in/john-doe"
          />
        </div>
      </div>
    </div>
  );
}
