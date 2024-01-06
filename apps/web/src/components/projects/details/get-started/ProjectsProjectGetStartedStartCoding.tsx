import { RiRocketLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  onStartClick: () => void;
}>;

export default function ProjectsProjectGetStartedStartCoding({
  onStartClick,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center gap-4 mb-20 mt-20">
      <Text size="body0" weight="bold">
        <FormattedMessage
          defaultMessage="Let's begin!"
          description="Title for Start Coding content section on Before You Get Started dialog"
          id="79YODs"
        />
      </Text>
      <Button
        addonPosition="start"
        icon={RiRocketLine}
        label={intl.formatMessage({
          defaultMessage: 'Start coding!',
          description:
            'Label for "Start coding!" button on Projects project page',
          id: 'HloN+i',
        })}
        size="lg"
        variant="primary"
        onClick={onStartClick}
      />
    </div>
  );
}
