import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';

type Props = Readonly<{
  completed: number;
  total: number;
}>;

export default function QuestionsProgressFraction({ completed, total }: Props) {
  return (
    <Text color="secondary" size="body3">
      <FormattedMessage
        defaultMessage="<completed>{completedQuestions}</completed>/{totalQuestions} completed"
        description="Line describing the number of questions completed by user over the total number of questions"
        id="Xh+8s6"
        values={{
          completed: (chunks) => <Text size="body2">{chunks}</Text>,
          completedQuestions: completed,
          totalQuestions: total,
        }}
      />
    </Text>
  );
}
