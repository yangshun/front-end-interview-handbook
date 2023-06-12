import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';

type Props = Readonly<{
  size?: 'lg' | 'md' | 'sm' | 'xl';
}>;

export default function LogoLink({ size = 'md' }: Props) {
  return (
    <Anchor
      className={clsx(
        'to-brand-dark inline-block bg-gradient-to-r from-pink-500 bg-clip-text font-bold text-transparent',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-md',
        size === 'lg' && 'text-lg',
        size === 'xl' && 'text-xl',
      )}
      href="/"
      variant="unstyled">
      GreatFrontEnd
    </Anchor>
  );
}
