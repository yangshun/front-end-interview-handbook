import clsx from 'clsx';
import { useId } from 'react';
import { RiLineChartLine } from 'react-icons/ri';

import type { QuestionImportance } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  children?: React.ReactNode;
  showIcon?: boolean;
  size?: TextSize;
  value: QuestionImportance;
}>;

const ImportanceLabelClasses: Record<QuestionImportance, string> = {
  high: 'text-red',
  low: 'text-yellow-500',
  medium: 'text-orange-500',
};

export default function QuestionImportanceLabel({
  children,
  showIcon = false,
  size = 'body3',
  value,
}: Props) {
  const id = useId();
  const intl = useIntl();

  const labels: Record<QuestionImportance, string> = {
    high: intl.formatMessage({
      defaultMessage: 'High',
      description: 'Label for high question importance',
      id: 'v2TGFl',
    }),
    low: intl.formatMessage({
      defaultMessage: 'Low',
      description: 'Label for low question importance',
      id: '0hdhAz',
    }),
    medium: intl.formatMessage({
      defaultMessage: 'Medium',
      description: 'Label for medium question importance',
      id: '1XjF3L',
    }),
  };

  const label = intl.formatMessage({
    defaultMessage: 'Importance',
    description:
      'Label for question importance - how important it is to practice this question',
    id: 'mb7erW',
  });

  return (
    <Tooltip label={label}>
      <span className="sr-only">{label}</span>
      <div aria-labelledby={id} className="flex items-center gap-x-1.5">
        {showIcon && (
          <RiLineChartLine
            aria-hidden="true"
            className={clsx('size-5 shrink-0', themeIconColor)}
          />
        )}
        <Text
          className={ImportanceLabelClasses[value]}
          color="inherit"
          size={size}>
          {children ?? labels[value]}
        </Text>
      </div>
    </Tooltip>
  );
}
