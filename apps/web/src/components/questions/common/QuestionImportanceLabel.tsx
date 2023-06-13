import { useId } from 'react';
import { RiLineChartLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { QuestionImportance } from '~/components/questions/common/QuestionsTypes';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';
type Props = Readonly<{
  children?: React.ReactNode;
  showIcon?: boolean;
  value: QuestionImportance;
}>;

const ImportanceLabelClasses: Record<QuestionImportance, string> = {
  high: 'text-red',
  low: 'text-yellow-500',
  mid: 'text-orange-500',
};

export default function QuestionImportanceLabel({
  children,
  showIcon = false,
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
    mid: intl.formatMessage({
      defaultMessage: 'Mid',
      description: 'Label for medium question importance',
      id: '73vnK2',
    }),
  };

  return (
    <Tooltip
      label={intl.formatMessage({
        defaultMessage: 'Importance',
        description:
          'Label for question importance - how important it is to practice this question',
        id: 'mb7erW',
      })}
      position="above">
      <span className="sr-only">
        <FormattedMessage
          defaultMessage="Importance"
          description="Screenreader text to indicate question importance - how important it is to practice this question"
          id="7OxMtC"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center">
        {showIcon && (
          <RiLineChartLine
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-400"
          />
        )}
        <Text
          className={ImportanceLabelClasses[value]}
          color="inherit"
          variant="body3"
          weight="bold">
          {children ?? labels[value]}
        </Text>
      </div>
    </Tooltip>
  );
}
