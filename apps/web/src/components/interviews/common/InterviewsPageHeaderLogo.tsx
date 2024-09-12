import clsx from 'clsx';

import {
  themeBackgroundCardColor,
  themeGlassyBorder,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>;

export default function InterviewsPageHeaderLogo({ icon: Icon }: Props) {
  return (
    <div
      className={clsx(
        'relative isolate',
        'rounded-lg',
        'overflow-hidden',
        'flex items-center justify-center',
        'size-16',
        themeBackgroundCardColor,
        themeGlassyBorder,
      )}>
      <Icon className={clsx('size-8 shrink-0', themeTextSubtitleColor)} />
      <div className="absolute inset-0">
        <div
          className={clsx(
            'absolute -top-[27px] left-1/2 -translate-x-1/2',
            'size-8',
            'bg-neutral-900 opacity-40 mix-blend-normal blur-[20.25px] dark:bg-neutral-100',
          )}
        />
      </div>
    </div>
  );
}
