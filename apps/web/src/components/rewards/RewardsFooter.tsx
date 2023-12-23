'use client';

import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  isSignedIn: boolean;
}>;

export default function RewardsHeader({ isSignedIn }: Props) {
  const intl = useIntl();

  return (
    <Container className="flex flex-col gap-6 items-center">
      <div className="flex flex-col gap-4 items-center">
        <Text color="secondary" display="inline-flex" size="body1">
          <FormattedMessage
            defaultMessage="Ready to begin?"
            description="Description for start tasks prompt"
            id="PjWWze"
          />
        </Text>
        <Button
          className="self-stretch sm:self-auto"
          href={
            isSignedIn
              ? '/rewards/tasks'
              : `/login?next=${encodeURIComponent('/rewards')}`
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
      <Text color="secondary" display="block" size="body2">
        <FormattedMessage
          defaultMessage="By proceeding, you agree to the <link>campaign's terms</link>."
          description="Campaign terms agreement prompt"
          id="iHPzK0"
          values={{
            link: (chunks) => (
              <Anchor className="font-medium" href="/rewards/terms">
                {chunks}
              </Anchor>
            ),
          }}
        />{' '}
      </Text>
    </Container>
  );
}
