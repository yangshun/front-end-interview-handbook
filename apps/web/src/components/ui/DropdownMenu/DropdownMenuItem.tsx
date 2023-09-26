import clsx from 'clsx';
import React from 'react';

import Text from '../Text';

import { Menu } from '@headlessui/react';

type Props = Readonly<{
  href?: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isSelected?: boolean;
  label: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLElement>;
}>;

export default function DropdownMenuItem({
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
            <Text
              className="items-center gap-x-2"
              color={isSelected ? 'active' : 'secondary'}
              display="flex"
              size="body2">
              {Icon && <Icon className="h-4 w-4 shrink-0" />}
              {label}
            </Text>
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
