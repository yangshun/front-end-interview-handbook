import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAuthFns } from '~/hooks/user/useAuthFns';

import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

export function ProjectsSidebarNotSignedInHeader() {
  const intl = useIntl();
  const { signInUpLabel, signInUpHref } = useAuthFns();

  return (
    <div className={clsx('flex flex-col gap-6')}>
      <div className={clsx('flex flex-col items-stretch gap-4')}>
        <div className="flex gap-4 px-3 py-2">
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
              <Anchor href={signInUpHref()}>
                {signInUpLabel}
                <RiArrowRightLine className="size-4 ms-1 shrink-0 inline-flex" />
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
    </div>
  );
}
