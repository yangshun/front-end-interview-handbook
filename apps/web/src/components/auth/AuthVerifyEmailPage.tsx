import clsx from 'clsx';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import Anchor from '../ui/Anchor';

export default function AuthVerifyEmailPage() {
  return (
    <Container className={clsx('flex flex-col', 'py-16')} variant="xl">
      <Heading className="text-center" level="heading4">
        We have sent a verification link to your email
      </Heading>
      <Text
        className="mt-4 md:mt-6 text-center"
        color="secondary"
        display="block"
        size="body2">
        Didn't receive it? Send{' '}
        <Anchor className="whitespace-nowrap" href="#">
          another link
        </Anchor>{' '}
        or <Anchor className="whitespace-nowrap">provide another email</Anchor>.
      </Text>
      <img
        alt="Email envelope illustration"
        className="block max-w-80 mx-auto mt-16"
        src="/img/marketing/envelope.svg"
      />
    </Container>
  );
}
