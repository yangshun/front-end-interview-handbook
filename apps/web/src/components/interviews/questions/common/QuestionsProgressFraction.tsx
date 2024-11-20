import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  completed: number;
  total: number;
}>;

export default function QuestionsProgressFraction({ completed, total }: Props) {
  return (
    <Text className="whitespace-nowrap" color="secondary" size="body3">
      <FormattedMessage
        defaultMessage="<bold>{completedQuestions}</bold>/{totalQuestions} completed"
        description="Line describing the number of questions completed by user over the total number of questions"
        id="ABJ7ip"
        values={{
          bold: (chunks) => <Text size="body2">{chunks}</Text>,
          completedQuestions: completed,
          totalQuestions: total,
        }}
      />
    </Text>
  );
}
