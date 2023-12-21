'use client';

import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';

import Anchor from '../ui/Anchor';
import Button from '../ui/Button';

type Props = Readonly<{
  isSignedIn: boolean;
}>;

export default function RewardsHeader({ isSignedIn }: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center mx-auto max-w-7xl px-4 pb-8 sm:px-4 lg:pb-12 gap-y-2 sm:gap-y-4">
      <Text color="secondary" display="block" size="body2">
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
      <Text color="secondary" display="block" size="body2">
        <FormattedMessage
          defaultMessage="By proceeding, you agree to the"
          description="Campaign terms agreement prompt"
          id="wR331j"
        />{' '}
        <Anchor href="/rewards/terms">
          <FormattedMessage
            defaultMessage="Campaign's Terms"
            description="Campaign terms link"
            id="EH6F7u"
          />
        </Anchor>
        .
      </Text>
    </div>
  );
}
