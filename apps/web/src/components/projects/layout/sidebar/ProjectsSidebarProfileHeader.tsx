import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useProfile from '~/hooks/user/useProfile';

import UserProfileDisplayName from '~/components/profile/info/UserProfileDisplayName';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import ProjectsSidebarHeaderLogoBar from './ProjectsSidebarHeaderLogoBar';
import ProjectsUserReputation from '../../users/ProjectsUserReputation';
import UserProfileTitle from '../../../profile/info/UserProfileTitle';

type Props = Readonly<{
  className?: string;
  points: number;
}>;

export function ProjectsSidebarProfileHeader({ className, points }: Props) {
  const intl = useIntl();
  const { profile } = useProfile();

  if (profile == null) {
    return null;
  }

  return (
    <header className={clsx('flex flex-col gap-6 p-4', className)}>
      <ProjectsSidebarHeaderLogoBar />
      <div className="flex flex-col items-start gap-2">
        <div className="flex gap-3">
          <ProjectsProfileAvatar
            level={11}
            profile={profile}
            progress={30}
            size="lg"
          />
          <div className="flex flex-col gap-1">
            <Text size="body2">
              <UserProfileDisplayName profile={profile} />
            </Text>
            <ProjectsUserReputation points={points} size="2xs" />
          </div>
        </div>
        <UserProfileTitle profile={profile} size="xs" />
        <Button
          addonPosition="end"
          className="dark:!text-brand !text-brand-dark -ms-3"
          href={`/projects/u/${profile.username}`}
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'My profile',
            description:
              'Label for My profile button in profile header of Projects sidebar',
            id: '19GB65',
          })}
          size="sm"
          variant="tertiary"
        />
      </div>
    </header>
  );
}
