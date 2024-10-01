import clsx from 'clsx';
import { RiCloseLine } from 'react-icons/ri';
import { useLocalStorage } from 'usehooks-ts';

import { usePreparationAreas } from '~/data/PreparationAreas';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Text from '~/components/ui/Text';
import { themeBackgroundCardColor } from '~/components/ui/theme';

import { QuestionCount } from '../questions/listings/stats/QuestionCount';

export default function InterviewsDashboardOnboarding() {
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
      <Card className="flex flex-col gap-6 p-4 md:p-8" padding={false}>
        <div className="flex justify-between gap-x-6">
          <Text className="block max-w-3xl" color="secondary" size="body2">
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
            className="-mt-2 md:-mr-3"
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
        <div className="hidden gap-4 lg:grid lg:grid-cols-4">
          {areas_.map(({ icon: Icon, label, description, value }) => (
            <div
              key={value}
              className={clsx(
                'flex flex-col gap-2 rounded-lg px-6 py-5',
                themeBackgroundCardColor,
              )}>
              <div className="flex items-center gap-x-3">
                <Icon className="size-6 text-neutral-400 dark:text-neutral-500" />
                <Text className="block" size="body1" weight="bold">
                  {label}
                </Text>
              </div>
              <Text className="line-clamp-3" color="secondary" size="body2">
                {description}
              </Text>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 lg:hidden">
          {areas_.map(({ icon: Icon, label, value }) => (
            <div
              key={value}
              className={clsx(
                'flex gap-2 rounded-md px-4 py-2',
                themeBackgroundCardColor,
              )}>
              <div className="flex items-center gap-x-3">
                <Icon className="size-6 text-neutral-400 dark:text-neutral-500" />
                <Text className="block" size="body2" weight="bold">
                  {label}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </CardContainer>
  );
}
