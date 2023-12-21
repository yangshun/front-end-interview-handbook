import { RiArrowRightLine, RiLinkedinFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  hasEntered: boolean;
}>;

export default function LinkedInFollowTask({ hasEntered }: Props) {
  // TODO: check task functionality + if completed (pending UI design)
  const intl = useIntl();

  return (
    <div className="py-2 md:py-3">
      <dt className="flex justify-between text-base sm:text-lg md:text-xl">
        <div className="flex items-center gap-x-2">
          <RiLinkedinFill className="text-neutral-600 dark:text-neutral-400" />
          <Text display="block" size="body3">
            <FormattedMessage
              defaultMessage="Follow our LinkedIn page"
              description="Title for LinkedIn follow task"
              id="afi284"
            />
          </Text>
        </div>
        {hasEntered && (
          <Button
            addonPosition="end"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Start task',
              description: 'Label for button to start task',
              id: 'Aarfzt',
            })}
            size="sm"
            type="button"
            variant="secondary"
            onClick={() =>
              window.open(
                'https://www.linkedin.com/company/greatfrontend',
                '_blank',
                'height=900, width=900',
              )
            }
          />
        )}
      </dt>
    </div>
  );
}
