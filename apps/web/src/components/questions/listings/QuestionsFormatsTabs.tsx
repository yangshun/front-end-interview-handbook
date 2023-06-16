import { useIntl } from 'react-intl';

import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import type { QuestionUserFacingFormat } from '../common/QuestionsTypes';
type Props = Readonly<{
  formats?: ReadonlyArray<QuestionUserFacingFormat>;
  onSelect: (format: QuestionUserFacingFormat) => void;
  progressSummary?: Record<
    QuestionUserFacingFormat,
    Readonly<{
      completed: number;
      total: number;
    }>
  >;
  value: QuestionUserFacingFormat;
}>;

const DEFAULT_FORMATS: ReadonlyArray<QuestionUserFacingFormat> = [
  'coding',
  'quiz',
  'system-design',
];

export default function QuestionsFormatTabs({
  formats = DEFAULT_FORMATS,
  progressSummary,
  value,
  onSelect,
}: Props) {
  const intl = useIntl();

  function getLabelForFormat(format: QuestionUserFacingFormat) {
    switch (format) {
      case 'coding':
        return progressSummary != null
          ? intl.formatMessage({
              defaultMessage: `Coding Questions`,
              description: 'Label for coding questions',
              id: 'zRNA7X',
            }) +
              ` (${progressSummary.coding.completed} / ${progressSummary.coding.total})`
          : intl.formatMessage({
              defaultMessage: `Coding Questions`,
              description: 'Label for coding questions',
              id: 'zRNA7X',
            });
      case 'quiz':
        return progressSummary != null
          ? intl.formatMessage({
              defaultMessage: `Quiz Questions`,
              description: 'Label for quiz questions',
              id: 'oE3TMf',
            }) +
              ` (${progressSummary.quiz.completed} / ${progressSummary.quiz.total})`
          : intl.formatMessage({
              defaultMessage: `Quiz Questions`,
              description: 'Label for quiz questions',
              id: 'oE3TMf',
            });
      case 'system-design':
        return progressSummary != null
          ? intl.formatMessage({
              defaultMessage: `System Design Questions`,
              description: 'Label for system design questions',
              id: 'VYWqtL',
            }) +
              ` (${progressSummary['system-design'].completed} / ${progressSummary['system-design'].total})`
          : intl.formatMessage({
              defaultMessage: `System Design Questions`,
              description: 'Label for system design questions',
              id: 'VYWqtL',
            });
    }
  }

  const tabItems: ReadonlyArray<{
    label: string;
    value: QuestionUserFacingFormat;
  }> = formats.map((format) => ({
    label: getLabelForFormat(format),
    value: format,
  }));

  return (
    <TabsUnderline
      label={intl.formatMessage({
        defaultMessage: 'Question Formats',
        description: 'Label for tabs for question formats',
        id: 'zSySsj',
      })}
      tabs={tabItems}
      value={value}
      onSelect={onSelect}
    />
  );
}
