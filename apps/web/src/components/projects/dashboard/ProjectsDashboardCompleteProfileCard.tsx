import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowUpSLine,
  RiCheckFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import Chip from '~/components/ui/Chip';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundColor,
  themeGlassyBorder,
  themeGradientBlueGreen,
} from '~/components/ui/theme';

const progressBarClassName = themeGradientBlueGreen.className;

export default function ProjectsDashboardCompleteProfileCard() {
  const intl = useIntl();
  const [isCardOpen, setIsCardOpen] = useState(false);

  const { data: userProfile } = trpc.projects.profile.viewer.useQuery();
  const profileTasks = [
    {
      isComplete: Boolean(userProfile?.bio),
      title: intl.formatMessage({
        defaultMessage: 'Add Bio',
        description: 'Title for Add Bio task on Projects dashboard page',
        id: 'kaQWYn',
      }),
    },
    {
      isComplete: Boolean(userProfile?.githubUsername),
      title: intl.formatMessage({
        defaultMessage: 'Add GitHub',
        description: 'Title for Add GitHub task on Projects dashboard page',
        id: 'syVPb5',
      }),
    },
    {
      isComplete: Boolean(userProfile?.linkedInUsername),
      title: intl.formatMessage({
        defaultMessage: 'Add LinkedIn',
        description: 'Title for Add LinkedIn task on Projects dashboard page',
        id: 'SSiHbz',
      }),
    },
    {
      isComplete: Boolean(userProfile?.website),
      title: intl.formatMessage({
        defaultMessage: 'Add website',
        description: 'Title for Add Website task on Projects dashboard page',
        id: 'pJja0T',
      }),
    },
    {
      isComplete: Boolean(
        userProfile?.projectsProfile?.skillsProficient?.length,
      ),
      title: intl.formatMessage({
        defaultMessage: 'Add proficient skills',
        description:
          'Title for Add Proficient Skills task on Projects dashboard page',
        id: '2QyluM',
      }),
    },
    {
      isComplete: Boolean(userProfile?.projectsProfile?.skillsToGrow?.length),
      title: intl.formatMessage({
        defaultMessage: 'Add skills to grow in',
        description:
          'Title for Add Skills To Grow In task on Projects dashboard page',
        id: 'uTqd3B',
      }),
    },
  ];

  const numLeft = profileTasks.filter((task) => !task.isComplete).length;
  const numTotal = profileTasks.length;

  if (numLeft === 0) {
    return null;
  }

  return (
    <div
      className={clsx('rounded-lg', themeBackgroundColor, themeGlassyBorder)}
      tabIndex={0}
      onFocus={() => setIsCardOpen(true)}
      onMouseEnter={() => setIsCardOpen(true)}
      onMouseLeave={() => setIsCardOpen(false)}>
      <div
        className={clsx(
          'flex flex-col gap-3 px-5 py-4',
          themeBackgroundCardColor,
        )}>
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
                  variant="secondary">
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
      </div>
    </div>
  );
}
