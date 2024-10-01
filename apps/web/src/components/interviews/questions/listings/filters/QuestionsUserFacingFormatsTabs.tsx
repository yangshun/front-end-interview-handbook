import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import { useIntl } from '~/components/intl';
import Tabs from '~/components/ui/Tabs';

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

export default function QuestionsUserFacingFormatTabs({
  formats = DEFAULT_FORMATS,
  progressSummary,
  value,
  onSelect,
}: Props) {
  const intl = useIntl();
  const userFacingFormats = useQuestionUserFacingFormatData();

  function getLabelForFormat(format: QuestionUserFacingFormat) {
    switch (format) {
      case 'coding': {
        const label = userFacingFormats.coding.name;

        return progressSummary != null
          ? label +
              ` (${progressSummary.coding.completed} / ${progressSummary.coding.total})`
          : label;
      }
      case 'quiz': {
        const label = userFacingFormats.quiz.name;

        return progressSummary != null
          ? label +
              ` (${progressSummary.quiz.completed} / ${progressSummary.quiz.total})`
          : label;
      }
      case 'system-design': {
        const label = userFacingFormats['system-design'].name;

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
    <Tabs
      label={intl.formatMessage({
        defaultMessage: 'Question formats',
        description: 'Label for tabs for question formats',
        id: 'NVrKll',
      })}
      size="sm"
      tabs={tabItems}
      value={value}
      onSelect={onSelect}
    />
  );
}
