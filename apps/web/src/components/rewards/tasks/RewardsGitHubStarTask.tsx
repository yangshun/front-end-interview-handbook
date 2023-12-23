import clsx from 'clsx';
import { RiArrowRightLine, RiStarLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  showActions: boolean;
}>;

export default function RewardsGitHubStarTask({ showActions }: Props) {
  // TODO: check task functionality + if completed (pending UI design)
  const intl = useIntl();

  return (
    <div className="flex justify-between py-4">
      <div className="flex items-center gap-x-4">
        <RiStarLine
          className={clsx(
            'h-6 w-6 shrink-0',
            'text-neutral-400 dark:text-neutral-500',
          )}
        />
        <Text display="block" size="body1">
          <FormattedMessage
            defaultMessage="Star our GitHub repo"
            description="Title for GitHub star task"
            id="gtnKcP"
          />
        </Text>
      </div>
      <div className={clsx(!showActions && 'invisible')}>
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
              'https://github.com/greatfrontend/awesome-front-end-system-design',
              '_blank',
              'height=900, width=900',
            )
          }
        />
      </div>
    </div>
  );
}
