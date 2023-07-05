import { RiCloseLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocalStorage } from 'usehooks-ts';

import { usePreparationAreas } from '~/data/PreparationAreas';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Text from '~/components/ui/Text';

import { QuestionCount } from '../questions/listings/stats/QuestionCount';

export default function DashboardOnboarding() {
  const intl = useIntl();
  const areas = usePreparationAreas();

  const [shouldHide, setShouldHide] = useLocalStorage(
    'gfe:dashboard-onboarding',
    false,
  );

  const areas_ = [
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
  ];

  if (shouldHide) {
    return null;
  }

  return (
    <CardContainer>
      <Card className="flex flex-col gap-6 p-8" padding={false}>
        <div className="flex justify-between gap-x-6">
          <Text className="max-w-3xl" color="secondary" display="block">
            <FormattedMessage
              defaultMessage="We recommend these {numberOfAreas} areas of learning to prepare you holistically for your front end interview rounds. Explore guides and {count}+ practice questions here."
              description="Message in onboarding card on prepare page"
              id="nvhCqI"
              values={{
                count: QuestionCount,
                numberOfAreas: areas_.length,
              }}
            />
          </Text>
          <Button
            className="-mr-3 -mt-2"
            icon={RiCloseLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Close',
              description: 'Close button label',
              id: 'PyDwDF',
            })}
            size="lg"
            variant="tertiary"
            onClick={() => setShouldHide(true)}
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {areas_.map(({ icon: Icon, label, description, value }) => (
            <div
              key={value}
              className="dark:bg-neutral-800/40 flex flex-col gap-2 rounded-lg bg-neutral-200/40 px-6 py-5">
              <div className="flex items-center gap-x-3">
                <Icon className="h-6 w-6 text-neutral-400 dark:text-neutral-500" />
                <Text display="block" weight="bold">
                  {label}
                </Text>
              </div>
              <Text
                className="!line-clamp-3"
                color="secondary"
                display="block"
                size="body2">
                {description}
              </Text>
            </div>
          ))}
        </div>
      </Card>
    </CardContainer>
  );
}
