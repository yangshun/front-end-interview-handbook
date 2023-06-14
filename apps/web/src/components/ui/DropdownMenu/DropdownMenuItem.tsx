import clsx from 'clsx';
import React from 'react';

import Text from '../Text';

import { Menu } from '@headlessui/react';

type Props = Readonly<{
  href?: string;
  isSelected?: boolean;
  label: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLElement>;
}>;

export default function DropdownMenuItem({
  href,
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
              color={isSelected ? undefined : 'secondary'}
              display="block"
              // TODO: Use smaller variant for smaller size.
              size="body2">
              {label}
            </Text>
          ),
          className: clsx(
            'block px-2 py-1.5',
            'text-sm w-full text-left',
            'rounded',
            active && 'bg-neutral-100 dark:bg-neutral-700',
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
