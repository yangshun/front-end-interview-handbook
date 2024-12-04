import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import ScrollArea from '~/components/ui/ScrollArea';
import { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

const SUBNAV_HEIGHT = 52;

type Props = Readonly<{
  items: ReadonlyArray<{
    href: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: string;
  }>;
}>;

export default function QuestionsSubnav({ items }: Props) {
  const { pathname } = useI18nPathname();

  return (
    <div
      className={clsx(
        'relative',
        'z-fixed sticky top-[var(--global-sticky-height)]',
      )}>
      <ScrollArea scrollbars="horizontal">
        <div
          className={clsx(
            'flex items-center gap-6 lg:justify-end',
            'h-[var(--subnav-height)] w-full px-6',
            'backdrop-blur',
          )}>
          <style
            dangerouslySetInnerHTML={{
              __html: `:root { --subnav-height: ${SUBNAV_HEIGHT}px; }`,
            }}
          />
          <div
            className={clsx(
              'max-lg:hidden',
              'absolute -right-0 top-0 h-px w-full',
              themeBackgroundColor,
            )}
          />
          <div
            className={clsx(
              'max-lg:hidden',
              'absolute -right-0 top-0 h-px w-1/2',
              'bg-gradient-to-r from-transparent to-neutral-200 dark:to-neutral-800',
            )}
          />
          {items.map(({ href, label, value, icon: Icon }) => {
            const isActive = href === pathname;

            return (
              <Anchor
                key={value}
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
      </ScrollArea>
    </div>
  );
}
