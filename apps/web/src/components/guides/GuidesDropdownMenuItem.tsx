import clsx from 'clsx';
import React from 'react';

import Text from '../ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeGlassyBorder,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '../ui/theme';

import { Menu } from '@headlessui/react';

type Props = Readonly<{
  href?: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  isSelected?: boolean;
  label: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLElement>;
}>;

export default function GuidesDropdownMenuItem({
  href,
  icon: Icon,
  isSelected = false,
  label,
  onClick,
}: Props) {
  return (
    <Menu.Item>
      {({ active }) => {
        const props = {
          children: (
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full',
                  themeGlassyBorder,
                  themeBackgroundLayerEmphasized,
                  isSelected ? themeTextBrandColor : themeTextSecondaryColor,
                )}>
                <Icon className="h-3 w-3" />
              </div>
              <Text
                color={isSelected ? 'active' : 'default'}
                display="block"
                size="body2"
                weight="bold">
                {label}
              </Text>
            </div>
          ),
          className: clsx(
            'block px-2 py-1.5',
            'w-full text-left',
            'rounded',
            active && 'bg-neutral-100 dark:bg-neutral-900',
          ),
          onClick,
        };

        if (href == null) {
          return <button type="button" {...props} />;
        }

        // TODO: Change to <Anchor> when there's a need for client-side navigation.
        return <a href={href} {...props} />;
      }}
    </Menu.Item>
  );
}
