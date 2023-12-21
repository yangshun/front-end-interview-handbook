import { RiArrowRightLine, RiGithubFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  hasEntered: boolean;
}>;

export default function GitHubFollowTask({ hasEntered }: Props) {
  // TODO: check task functionality + if completed (pending UI design)
  const intl = useIntl();

  return (
    <div className="py-2 md:py-3">
      <dt className="flex justify-between text-base sm:text-lg md:text-xl">
        <div className="flex items-center gap-x-2">
          <RiGithubFill className="text-neutral-600 dark:text-neutral-400" />
          <Text display="block" size="body3">
            <FormattedMessage
              defaultMessage="Follow our GitHub organisation"
              description="Title for GitHub follow task"
              id="u2zHME"
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
                'https://github.com/greatfrontend',
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
