import clsx from 'clsx';
import type { ReactNode } from 'react';

import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasizedHover,
  themeBorderColor,
  themeChipBackgroundColor,
  themeDivideColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  isShown: boolean;
  layouts: ReadonlyArray<CodingWorkspaceLayoutItem>;
  onClose: () => void;
}>;

export type CodingWorkspaceLayoutItem = Readonly<{
  description: ReactNode;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  id: string;
  name: string;
  onClick: () => void;
}>;

export default function CodingWorkspaceLayoutDialog({
  isShown,
  onClose,
  layouts,
}: Props) {
  return (
    <Dialog isShown={isShown} title="Change workspace layout" onClose={onClose}>
      <div className="flex flex-col gap-y-4">
        <Text color="secondary" display="block" size="body2">
          Choose a layout that best suits your needs.
        </Text>
        <div
          className={clsx(
            'flex flex-col rounded border ',
            ['border', themeBorderColor],
            ['divide-y', themeDivideColor],
          )}>
          {layouts.map(({ description, icon: Icon, name, onClick }) => (
            <button
              key={name}
              className={clsx(
                'group/card flex gap-3 p-3 transition',
                themeBackgroundLayerEmphasizedHover,
              )}
              type="button"
              onClick={onClick}>
              <span
                className={clsx(
                  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                  themeChipBackgroundColor,
                  themeTextSecondaryColor,
                  'border border-transparent transition',
                  'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
                  'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
                )}>
                <Icon aria-hidden={true} className="h-5 w-5 shrink-0" />
              </span>
              <div className="flex flex-col gap-1 text-start">
                <Text display="block" size="body2" weight="medium">
                  {name}
                </Text>
                <Text color="secondary" display="block" size="body3">
                  {description}
                </Text>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Dialog>
  );
}
