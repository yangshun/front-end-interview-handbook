import clsx from 'clsx';

import {
  themeBorderColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

type DividerColor = 'default' | 'emphasized';

type Props = Readonly<{
  className?: string;
  color?: DividerColor;
}>;

const dividerClass: Record<DividerColor, string> = {
  default: themeBorderColor,
  emphasized: themeBorderElementColor,
};

export default function Divider({ color = 'default', className }: Props) {
  return <hr className={clsx(dividerClass[color], className)} />;
}
