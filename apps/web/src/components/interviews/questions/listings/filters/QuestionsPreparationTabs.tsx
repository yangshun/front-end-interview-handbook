import type { PreparationArea } from '~/data/PreparationAreas';
import { usePreparationAreas } from '~/data/PreparationAreas';

import { FormattedMessage, useIntl } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Tabs from '~/components/ui/Tabs';

type Props = Readonly<{
  area: PreparationArea;
}>;

export default function QuestionsPreparationTabs({ area }: Props) {
  const intl = useIntl();
  const areas = usePreparationAreas();

  return (
    <div>
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Preparation areas"
          description="Preparation tabs title"
          id="LU7oiZ"
        />
      </Heading>
      <Section>
        <Tabs
          label={intl.formatMessage({
            defaultMessage: 'Navigate to preparation area',
            description: 'Tab label to navigate to another preparation page',
            id: 'rhLand',
          })}
          scroll={false}
          size="sm"
          tabs={[
            {
              href: areas.coding.href,
              icon: areas.coding.icon,
              label: areas.coding.name,
              value: areas.coding.value,
            },
            {
              href: areas.quiz.href,
              icon: areas.quiz.icon,
              label: areas.quiz.name,
              value: areas.quiz.value,
            },
            {
              href: areas['system-design'].href,
              icon: areas['system-design'].icon,
              label: areas['system-design'].name,
              value: areas['system-design'].value,
            },
            {
              href: areas.behavioral.href,
              icon: areas.behavioral.icon,
              label: areas.behavioral.name,
              value: areas.behavioral.value,
            },
          ]}
          value={area}
        />
      </Section>
    </div>
  );
}
