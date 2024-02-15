'use client';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';

import Anchor from '../ui/Anchor';
import Text from '../ui/Text';

type Props = Readonly<{
  next: string;
}>;

export default function AuthPasswordResetSentPage({ next }: Props) {
  const intl = useIntl();

  return (
    <Container className={clsx('flex flex-col', 'py-16')} variant="2xl">
      <Heading className="text-center" level="heading5">
        {intl.formatMessage({
          defaultMessage:
            'An email containing the password reset instructions will be sent if an associated account exists',
          description: 'Message indicating a successful password reset request',
          id: 'Q0sZmk',
        })}
      </Heading>
      <div className="text-center mt-4">
        <Text size="body2">
          <Anchor href={`/login?next=${next}`}>Go back to sign in</Anchor>
        </Text>
      </div>
      <img
        alt="Email envelope illustration"
        className="block max-w-80 mx-auto mt-16"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
