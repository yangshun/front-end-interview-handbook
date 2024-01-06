import clsx from 'clsx';

import { themeBorderColor } from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
}>;

export default function Divider({ className }: Props) {
  return <hr className={clsx(themeBorderColor, className)} />;
}
