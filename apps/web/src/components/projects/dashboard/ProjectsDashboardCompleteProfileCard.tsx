import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowUpSLine,
  RiCheckFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import useProfile from '~/hooks/user/useProfile';

import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import Chip from '~/components/ui/Chip';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import { themeGradientBlueGreen } from '~/components/ui/theme';

const progressBarClassName = themeGradientBlueGreen.className;

export default function ProjectsDashboardCompleteProfileCard() {
  const intl = useIntl();
  const [isCardOpen, setIsCardOpen] = useState(false);

  const { profile } = useProfile();
  const profileTasks = [
    {
      isComplete: Boolean(profile?.bio),
      title: intl.formatMessage({
        defaultMessage: 'Add Bio',
        description: 'Title for Add Bio task on Projects dashboard page',
        id: 'kaQWYn',
      }),
    },
    {
      isComplete: Boolean(profile?.githubUsername),
      title: intl.formatMessage({
        defaultMessage: 'Add GitHub',
        description: 'Title for Add GitHub task on Projects dashboard page',
        id: 'syVPb5',
      }),
    },
    {
      isComplete: Boolean(profile?.linkedInUsername),
      title: intl.formatMessage({
        defaultMessage: 'Add LinkedIn',
        description: 'Title for Add LinkedIn task on Projects dashboard page',
        id: 'SSiHbz',
      }),
    },
    {
      isComplete: Boolean(profile?.website),
      title: intl.formatMessage({
        defaultMessage: 'Add website',
        description: 'Title for Add Website task on Projects dashboard page',
        id: 'pJja0T',
      }),
    },
  ];
  const numLeft = profileTasks.filter((task) => !task.isComplete).length;
  const numTotal = profileTasks.length;

  if (numLeft === 0) {
    return null;
  }

  return (
    <Card
      className={clsx('flex flex-col gap-3 px-5 py-4')}
      disableSpotlight={true}
      padding={false}
      pattern={false}>
      <div className="flex flex-col gap-2">
        <button
          className="flex justify-between"
          type="button"
          onClick={() => {
            setIsCardOpen((isOpen) => !isOpen);
          }}>
          <div className="flex items-center gap-2">
            <Text size="body2">
              <FormattedMessage
                defaultMessage="Complete your profile"
                description="Title for Complete profile card on Projects dashboard page"
                id="XkNVS1"
              />
            </Text>
            <Chip
              className="!bg-brand-dark dark:!bg-brand-darker"
              label={intl.formatNumber(numLeft)}
              size="xs"
              variant="primary"
            />
          </div>
          {isCardOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </button>
        <Text color="secondary" size="body3">
          <FormattedMessage
            defaultMessage="Completed profiles get 3x more responses"
            description="Subtitle for Complete profile card on Projects dashboard page"
            id="HP34xZ"
          />
        </Text>
      </div>
      {isCardOpen && (
        <ProgressBar
          label={intl.formatMessage({
            defaultMessage: 'Profile completion progress bar',
            description:
              'Label for Profile completion progress bar on Projects dashboard page',
            id: 'hIOUCl',
          })}
          progressClass={progressBarClassName}
          total={numTotal}
          value={numTotal - numLeft}
        />
      )}
      {isCardOpen && (
        <div className="flex flex-col gap-4">
          {profileTasks.map((task) => (
            <div key={task.title} className="flex items-center gap-4">
              <Chip
                icon={RiCheckFill}
                isLabelHidden={true}
                label={task.isComplete ? 'Completed' : 'Not completed'}
                size="sm"
                variant={task.isComplete ? 'success' : 'neutral'}
              />
              <Anchor
                className="flex grow justify-between gap-3"
                href="/projects/profile/edit"
                variant="muted">
                <Text
                  className={clsx(task.isComplete && 'line-through')}
                  size="body2">
                  {task.title}
                </Text>
                {!task.isComplete && <RiArrowRightLine />}
              </Anchor>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
