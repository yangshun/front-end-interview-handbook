import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import ProjectsSidebarHeaderLogoBar from './ProjectsSidebarHeaderLogoBar';

type Props = Readonly<{
  className?: string;
}>;

export function ProjectsSidebarNotSignedInHeader({ className }: Props) {
  const intl = useIntl();

  return (
    <header className={clsx('flex flex-col gap-6 p-4', className)}>
      <ProjectsSidebarHeaderLogoBar />
      <div className="flex flex-col items-stretch gap-2">
        <div className="flex gap-3">
          <Avatar alt="N/A" size="lg" src="" />
          <div className="flex flex-col gap-1">
            <Text size="body2">
              <FormattedMessage
                defaultMessage="Not signed in"
                description="Label showing not signed in in profile header of Projects sidebar"
                id="zL/JCy"
              />
            </Text>
            <Button
              addonPosition="end"
              className="dark:!text-brand !text-brand-dark -ms-3"
              icon={RiArrowRightLine}
              label={intl.formatMessage({
                defaultMessage: 'Sign in/up',
                description:
                  'Label for Sign in/up button in profile header of Projects sidebar',
                id: 'vYkB/0',
              })}
              size="sm"
              variant="tertiary"
            />
          </div>
        </div>
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Get full access',
            description:
              'Label for Get full access button in profile header of Projects sidebar',
            id: 'xz0GES',
          })}
          size="xs"
          variant="primary"
        />
      </div>
    </header>
  );
}
