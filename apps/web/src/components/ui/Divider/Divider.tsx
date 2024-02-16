import clsx from 'clsx';

import {
  themeBorderColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

type DividerColor = 'default' | 'emphasized';

type Props = Readonly<{
  className?: string;
  color?: DividerColor;
}>;

const dividerColorClass: Record<DividerColor, string> = {
  default: themeBorderColor,
  emphasized: themeBorderEmphasizeColor,
};

export default function Divider({ color = 'default', className }: Props) {
  return <hr className={clsx(dividerColorClass[color], className)} />;
}
