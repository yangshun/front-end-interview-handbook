'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import { useIntl } from '~/components/intl';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeBackgroundEmphasized_Hover,
  themeBorderEmphasizeColor,
  themeDivideEmphasizeColor,
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
  const intl = useIntl();

  return (
    <Dialog
      isShown={isShown}
      title={intl.formatMessage({
        defaultMessage: 'Change workspace layout',
        description: 'Change coding workspace layout title',
        id: '2SM6li',
      })}
      onClose={onClose}>
      <div className="flex flex-col gap-y-4">
        <Text className="block" color="secondary" size="body2">
          {intl.formatMessage({
            defaultMessage: 'Choose a layout that best suits your needs.',
            description: 'Change coding workspace layout description',
            id: 'AGnFjn',
          })}
        </Text>
        <div
          className={clsx(
            'flex flex-col rounded-md',
            ['border', themeBorderEmphasizeColor],
            ['divide-y', themeDivideEmphasizeColor],
            'overflow-hidden',
          )}>
          {layouts.map(({ description, icon: Icon, name, onClick }) => (
            <button
              key={name}
              className={clsx(
                'group/card flex gap-3 p-3 transition',
                themeBackgroundEmphasized_Hover,
              )}
              type="button"
              onClick={onClick}>
              <span
                className={clsx(
                  'inline-flex shrink-0 items-center justify-center',
                  'size-8',
                  'rounded-md',
                  themeBackgroundEmphasized,
                  themeTextSecondaryColor,
                  'border border-transparent transition',
                  'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
                  'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
                )}>
                <Icon aria-hidden={true} className="size-5 shrink-0" />
              </span>
              <div className="flex flex-col gap-1 text-start">
                <Text className="block" size="body2" weight="medium">
                  {name}
                </Text>
                <Text className="block" color="secondary" size="body3">
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
