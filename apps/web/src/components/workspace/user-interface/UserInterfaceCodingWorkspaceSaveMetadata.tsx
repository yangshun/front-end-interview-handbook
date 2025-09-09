import type { QuestionUserInterfaceFramework } from '@prisma/client';
import clsx from 'clsx';
import { RiTimeLine } from 'react-icons/ri';

import { QuestionFrameworkLabels } from '~/data/QuestionCategories';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import QuestionFrameworkIcon from '~/components/interviews/questions/metadata/QuestionFrameworkIcon';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

type Props = Readonly<{
  createdAt: Date;
  framework: QuestionUserInterfaceFramework;
  isActive: boolean;
  name: string;
}>;

export default function UserInterfaceCodingWorkspaceSaveMetadata({
  createdAt,
  framework,
  isActive,
  name,
}: Props) {
  const intl = useIntl();
  const lowerCaseFramework = staticLowerCase(framework);
  const frameworkLabel = QuestionFrameworkLabels[lowerCaseFramework];

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center gap-2">
        <Text size="body1" weight="bold">
          {name}
        </Text>
        {isActive && (
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'Current',
              description: 'Current active submission label',
              id: 'R56YnA',
            })}
            size="xs"
            variant="neutral"
          />
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <div className={clsx('flex items-center gap-1.5')}>
          <QuestionFrameworkIcon
            className="!size-4 grayscale"
            framework={lowerCaseFramework}
          />
          <Text color="secondary" size="body3">
            {frameworkLabel}
          </Text>
        </div>
        <div className={clsx('flex items-center gap-1.5')}>
          <RiTimeLine
            aria-hidden="true"
            className={clsx('size-4 shrink-0', themeTextSubtleColor)}
          />
          <Text color="secondary" size="body3">
            <RelativeTimestamp timestamp={createdAt} />
          </Text>
        </div>
      </div>
    </div>
  );
}
