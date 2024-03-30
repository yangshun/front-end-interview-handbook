import clsx from 'clsx';

import { themeTextSubtitleColor } from '~/components/ui/theme';

type Props = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>;

export default function ProjectsMarketingFeaturedIcon({ icon: Icon }: Props) {
  return (
    // Uses following technique to create gradient border with transparent center:
    // https://codepen.io/lasjorg/pen/zYaEVWQ?editors=1100
    <div
      className={clsx(
        'relative box-border overflow-hidden before:absolute before:inset-0 before:rounded-lg before:border before:border-transparent',
        'before:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)]',
        'before:[-webkit-mask-composite:destination-out]',
        'before:[mask-composite:exclude]',
        'before:bg-transparent before:bg-gradient-to-br before:bg-clip-border before:bg-origin-border',
        'before:from-[#22c55e]/80 before:to-[#22c55e]/20',
        'dark:before:from-[#22c55e]/80 dark:before:to-[#d9d6ff]/20',
      )}>
      <div className="rounded-lg bg-gradient-to-br from-[#22c55e]/10 to-transparent p-3">
        <Icon className={clsx('h-6 w-6', themeTextSubtitleColor)} />
      </div>
    </div>
  );
}
