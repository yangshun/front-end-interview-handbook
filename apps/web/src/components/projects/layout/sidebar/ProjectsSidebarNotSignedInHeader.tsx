import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  className?: string;
}>;

export function ProjectsSidebarNotSignedInHeader({ className }: Props) {
  const intl = useIntl();

  return (
    <header className={clsx('flex flex-col gap-6', className)}>
      <div className="flex flex-col items-stretch gap-4">
        <div className="flex gap-4">
          <Avatar alt="N/A" size="lg" src="" />
          <div className="flex flex-col gap-1">
            <Text size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Not signed in"
                description="Label showing not signed in in profile header of Projects sidebar"
                id="zL/JCy"
              />
            </Text>
            <Text size="body3" weight="medium">
              <Anchor href="/sign-up?next=/projects/onboarding">
                {intl.formatMessage({
                  defaultMessage: 'Sign in/up',
                  description:
                    'Label for Sign in/up button in profile header of Projects sidebar',
                  id: 'vYkB/0',
                })}
                <RiArrowRightLine className="h-4 w-4 ms-1 shrink-0 inline-flex" />
              </Anchor>
            </Text>
          </div>
        </div>
        <Button
          href="/projects/pricing"
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
