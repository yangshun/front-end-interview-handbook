import InterviewsRibbonBadge from '~/components/interviews/common/InterviewsRibbonBadge';
import { useIntl } from '~/components/intl';

export default function QuestionNewLabel({
  created,
}: Readonly<{
  created: number;
}>) {
  const intl = useIntl();
  const currentDate = new Date();
  // One month ago.
  const cutoffDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

  // Don't show "NEW" label if question was created before cutoff time.
  if (created < cutoffDate.getTime() / 1000) {
    return null;
  }

  return (
    <InterviewsRibbonBadge
      label={intl.formatMessage({
        defaultMessage: 'NEW',
        description: 'Label for new questions ribbon',
        id: '3FeosO',
      })}
    />
  );
}
