'use client';

import { RiArrowRightLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useUserProfile from '~/hooks/user/useUserProfile';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Text from '~/components/ui/Text';

export default function RewardsHeader() {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <Container className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Ready to begin?"
            description="Description for start tasks prompt"
            id="PjWWze"
          />
        </Text>
        <Button
          className="self-stretch sm:self-auto"
          href={
            userProfile != null
              ? '/rewards/social/tasks'
              : signInUpHref({
                  next: '/rewards/social/tasks',
                })
          }
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Start tasks',
            description: 'Start tasks button',
            id: 'FCFcH2',
          })}
          size="lg"
          variant="primary"
        />
      </div>
      <Text className="block" color="secondary" size="body2">
        <FormattedMessage
          defaultMessage="By proceeding, you agree to the <link>campaign's terms</link>."
          description="Campaign terms agreement prompt"
          id="iHPzK0"
          values={{
            link: (chunks) => (
              <Anchor className="font-medium" href="/rewards/social/terms">
                {chunks}
              </Anchor>
            ),
          }}
        />{' '}
      </Text>
    </Container>
  );
}
