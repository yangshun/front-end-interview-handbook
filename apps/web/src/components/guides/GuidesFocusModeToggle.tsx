import clsx from 'clsx';
import { useIntl } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeOutlineElementBrandColor_FocusVisible } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import * as Switch from '@radix-ui/react-switch';

type Props = Readonly<{
  isFocusMode: boolean;
  toggleFocusMode?: () => void;
}>;

export default function GuidesFocusModeToggle({
  isFocusMode,
  toggleFocusMode,
}: Props) {
  const intl = useIntl();

  const toggleButton = (
    <div className="flex items-center justify-between gap-2">
      {!isFocusMode && (
        <Text size="body2" weight="medium">
          {intl.formatMessage({
            defaultMessage: 'Focus mode',
            description: 'Label for focus mode toggle button',
            id: 'tEaNEQ',
          })}
        </Text>
      )}
      <Switch.Root
        checked={isFocusMode}
        className={clsx(
          'h-4 w-8 shrink-0',
          'rounded-full',
          'transition-colors',
          [
            'border',
            'border-neutral-700 dark:border-neutral-100',
            'data-[state=checked]:border-brand-dark dark:data-[state=checked]:border-brand',
          ],
          'data-[state=checked]:bg-brand-dark dark:data-[state=checked]:bg-brand',
          themeOutlineElementBrandColor_FocusVisible,
        )}
        onCheckedChange={toggleFocusMode}>
        <Switch.Thumb
          className={clsx(
            'block',
            'size-2 rounded-full',
            'bg-neutral-700 dark:bg-neutral-100',
            'translate-x-1',
            'data-[state=checked]:translate-x-[18px]',
            'transition-transform duration-100 will-change-transform',
          )}
        />
      </Switch.Root>
    </div>
  );

  return (
    <div>
      {isFocusMode ? (
        <Tooltip
          asChild={true}
          label={intl.formatMessage({
            defaultMessage: 'Toggle focus mode off',
            description: 'Label for toggle focus mode off',
            id: 'C/ODJo',
          })}>
          {toggleButton}
        </Tooltip>
      ) : (
        toggleButton
      )}
    </div>
  );
}
