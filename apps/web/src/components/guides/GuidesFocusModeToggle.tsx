import * as Switch from '@radix-ui/react-switch';
import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';
import { themeOutlineElementBrandColor_FocusVisible } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  isFocusMode: boolean;
  toggleFocusMode?: () => void;
}>;

export default function GuidesFocusModeToggle({
  isFocusMode,
  toggleFocusMode,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex w-full items-center justify-between gap-2">
      {!isFocusMode && (
        <Text color="secondary" size="body3" weight="medium">
          {intl.formatMessage({
            defaultMessage: 'Focus mode',
            description: 'Label for focus mode toggle button',
            id: 'tEaNEQ',
          })}
        </Text>
      )}
      <Tooltip
        asChild={true}
        label={
          isFocusMode
            ? intl.formatMessage({
                defaultMessage: 'Turn off focus mode',
                description: 'Label for turning focus mode off',
                id: 'pdO/k1',
              })
            : intl.formatMessage({
                defaultMessage:
                  'Switching on focus mode collapses all sidebars to provide a better reading experience.',
                description: 'Label for turning focus mode on',
                id: '64nz1e',
              })
        }>
        <Switch.Root
          checked={isFocusMode}
          className={clsx(
            'h-4 w-8 shrink-0',
            'rounded-full',
            'transition-colors',
            [
              'border',
              isFocusMode
                ? 'dark:border-white'
                : 'border-neutral-700 dark:border-neutral-100',
            ],
            isFocusMode && 'bg-neutral-900 dark:bg-white',
            themeOutlineElementBrandColor_FocusVisible,
          )}
          onCheckedChange={toggleFocusMode}>
          <Switch.Thumb
            className={clsx(
              'block',
              'size-2 rounded-full',
              isFocusMode
                ? 'bg-white dark:bg-neutral-900'
                : 'bg-neutral-700 dark:bg-neutral-100',
              'translate-x-1 data-[state=checked]:translate-x-[18px]',
              'transition-transform duration-100 will-change-transform',
            )}
          />
        </Switch.Root>
      </Tooltip>
    </div>
  );
}
