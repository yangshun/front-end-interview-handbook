import { FormattedMessage } from 'react-intl';

import { usePreparationAreas } from '~/data/PreparationAreas';

import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import { QuestionCount } from '../stats/QuestionCount';

export default function QuestionsPreparationOnboarding() {
  const areas = usePreparationAreas();

  return (
    <Card className="flex flex-col gap-6 p-8" padding={false}>
      <Text className="max-w-3xl" color="secondary" display="block">
        <FormattedMessage
          defaultMessage="We recommend these {numberOfAreas} areas of learning to prepare you holistically for your front end interview rounds. Explore guides and {count}+ practice questions here."
          description="Message in onboarding card on prepare page"
          id="nvhCqI"
          values={{
            count: QuestionCount,
            numberOfAreas: 4,
          }}
        />
      </Text>
      <div className="grid gap-4 lg:grid-cols-4">
        {[
          {
            description: areas.coding.description,
            icon: areas.coding.icon,
            label: areas.coding.name,
            value: areas.coding.value,
          },
          {
            description: areas.quiz.description,
            icon: areas.quiz.icon,
            label: areas.quiz.name,
            value: areas.quiz.value,
          },
          {
            description: areas['system-design'].description,
            icon: areas['system-design'].icon,
            label: areas['system-design'].name,
            value: areas['system-design'].value,
          },
          {
            description: areas.behavioral.description,
            icon: areas.behavioral.icon,
            label: areas.behavioral.name,
            value: areas.behavioral.value,
          },
        ].map(({ icon: Icon, label, description, value }) => (
          <div
            key={value}
            className="flex flex-col gap-2 rounded-lg bg-neutral-200/40 py-5 px-6 dark:bg-neutral-800/40">
            <div className="flex items-center gap-x-3">
              <Icon className="h-6 w-6 text-neutral-400 dark:text-neutral-500" />
              <Heading level="heading6">{label}</Heading>
            </div>
            <Text
              className="line-clamp-3"
              color="secondary"
              display="block"
              size="body2">
              {description}
            </Text>
          </div>
        ))}
      </div>
    </Card>
  );
}
