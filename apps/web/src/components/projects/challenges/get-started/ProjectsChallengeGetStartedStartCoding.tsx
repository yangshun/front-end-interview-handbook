import { RiRocketLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  isLoading: boolean;
  onStartClick: () => void;
}>;

export default function ProjectsChallengeGetStartedStartCoding({
  isLoading,
  onStartClick,
}: Props) {
  const intl = useIntl();

  return (
    <div className="my-10 -ml-10 flex flex-col items-center gap-4">
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
        isDisabled={isLoading}
        isLoading={isLoading}
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
