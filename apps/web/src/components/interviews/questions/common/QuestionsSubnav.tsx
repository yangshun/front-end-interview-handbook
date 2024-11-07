import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import { textVariants } from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  items: ReadonlyArray<{
    href: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    id: string;
    label: string;
  }>;
}>;

export default function QuestionsSubnav({ items }: Props) {
  const { pathname } = useI18nPathname();

  return (
    <div
      className={clsx(
        'relative flex h-[52px] items-center gap-6 px-6 lg:justify-end',
        'w-full',
        'overflow-x-auto',
      )}>
      <div
        className={clsx(
          'max-lg:hidden',
          'absolute -right-0 top-0 h-px w-1/2',
          'bg-gradient-to-r from-transparent to-neutral-200 dark:to-neutral-800',
        )}
      />
      {items.map(({ href, label, id, icon: Icon }) => {
        const isActive = href === pathname;

        return (
          <Anchor
            key={id}
            className={clsx(
              'inline-flex gap-2 whitespace-nowrap',
              textVariants({
                color: isActive ? 'default' : 'secondary',
                size: 'body2',
                weight: isActive ? 'medium' : 'normal',
              }),
            )}
            href={href}
            variant="unstyled">
            <Icon
              aria-hidden={true}
              className={clsx(
                'size-5 shrink-0',
                !isActive && themeTextSubtleColor,
              )}
            />
            {label}
          </Anchor>
        );
      })}
    </div>
  );
}
