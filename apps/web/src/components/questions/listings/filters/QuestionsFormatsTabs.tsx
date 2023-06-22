import { useIntl } from 'react-intl';

import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import type { QuestionUserFacingFormat } from '../../common/QuestionsTypes';

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
      case 'coding': {
        const label = intl.formatMessage({
          defaultMessage: 'Coding',
          description: 'Label for coding questions',
          id: '94CGBX',
        });

        return progressSummary != null
          ? label +
              ` (${progressSummary.coding.completed} / ${progressSummary.coding.total})`
          : label;
      }
      case 'quiz': {
        const label = intl.formatMessage({
          defaultMessage: 'Quiz',
          description: 'Label for quiz questions',
          id: 'fJYFo8',
        });

        return progressSummary != null
          ? label +
              ` (${progressSummary.quiz.completed} / ${progressSummary.quiz.total})`
          : label;
      }
      case 'system-design': {
        const label = intl.formatMessage({
          defaultMessage: `System Design Questions`,
          description: 'Label for system design questions',
          id: 'VYWqtL',
        });

        return progressSummary != null
          ? label +
              ` (${progressSummary['system-design'].completed} / ${progressSummary['system-design'].total})`
          : label;
      }
    }
  }

  const tabItems: ReadonlyArray<{
    label: string;
    value: QuestionUserFacingFormat;
  }> = formats
    .filter((format) =>
      // Filter out formats that aren't relevant.
      progressSummary == null ? true : progressSummary[format].total > 0,
    )
    .map((format) => ({
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
      size="sm"
      tabs={tabItems}
      value={value}
      onSelect={onSelect}
    />
  );
}
