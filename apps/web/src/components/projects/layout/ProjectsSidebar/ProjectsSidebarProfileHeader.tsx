import clsx from 'clsx';
import { RiArrowRightLine, RiFireLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeTextBrandColor } from '~/components/ui/theme';

import useUserName from '~/utils/user/useUserName';

import ProjectsSidebarHeaderLogoBar from './ProjectsSidebarHeaderLogoBar';
import ProjectsUserJobTitle from '../../users/ProjectsUserJobTitle';
import UserAvatarWithLevel from '../../users/UserAvatarWithLevel';

import type { User } from '@supabase/supabase-js';

type Props = Readonly<{
  className?: string;
  jobTitle: string;
  repCount: number;
  user: User;
}>;

export function ProjectsSidebarProfileHeader({
  className,
  user,
  jobTitle,
  repCount,
}: Props) {
  const intl = useIntl();

  const userName = useUserName(user);

  return (
    <header className={clsx('flex flex-col gap-6 p-4', className)}>
      <ProjectsSidebarHeaderLogoBar />
      <div className="flex flex-col items-start gap-2">
        <div className="flex gap-3">
          <UserAvatarWithLevel level={11} progress={30} size="lg" />
          <div className="flex flex-col gap-1">
            <Text size="body2">{userName}</Text>
            <div className={clsx('flex gap-1', themeTextBrandColor)}>
              <RiFireLine className="h-3 w-3" />
              <Text color="inherit" size="body3">
                <FormattedMessage
                  defaultMessage="{repCount} Reputation"
                  description="Label showing reputation count in profile header of Projects sidebar"
                  id="Loi5gN"
                  values={{ repCount }}
                />
              </Text>
            </div>
          </div>
        </div>
        <ProjectsUserJobTitle jobTitle={jobTitle} />
        <Button
          addonPosition="end"
          className="dark:!text-brand !text-brand-dark -ms-3"
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
