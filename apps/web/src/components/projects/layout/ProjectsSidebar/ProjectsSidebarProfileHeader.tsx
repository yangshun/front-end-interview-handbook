import clsx from 'clsx';
import { RiArrowRightLine, RiBuildingLine, RiFireLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import ProjectsSidebarHeaderLogoBar from './ProjectsSidebarHeaderLogoBar';

type Props = Readonly<{
  className?: string;
  jobTitle: string;
  repCount: number;
  userName: string;
}>;

export function ProjectsSidebarProfileHeader({
  className,
  userName,
  jobTitle,
  repCount,
}: Props) {
  const intl = useIntl();

  return (
    <header className={clsx('flex flex-col gap-6 p-4', className)}>
      <ProjectsSidebarHeaderLogoBar />
      <div className="flex flex-col items-start gap-2">
        <div className="flex gap-3">
          <Avatar
            size="lg"
            src="https://source.unsplash.com/random/40x40"
            userName={userName}
          />
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
        <div
          className={clsx('flex items-center gap-1', themeTextSecondaryColor)}>
          <RiBuildingLine className="h-4 w-4" />
          <Text color="inherit" size="body2">
            {jobTitle}
          </Text>
        </div>
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
