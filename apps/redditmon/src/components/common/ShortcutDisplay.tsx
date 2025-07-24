import { Fragment } from 'react';

import KeyboardChar from '~/components/common/KeyboardChar';

import { getShortcut, type ShortcutAction } from '~/config/shortcuts';

type Props = {
  action: ShortcutAction;
  /** Custom separator between keys (default: " then ") */
  separator?: string;
};

/**
 * Displays keyboard shortcut keys for a given action using the centralized shortcuts config
 * For sequences like "G then 1", it shows multiple KeyboardChar components with separators
 */
export default function ShortcutDisplay({ action, separator = ' then ' }: Props) {
  const config = getShortcut(action);
  const keys = Array.isArray(config.keys) ? config.keys : [config.keys];

  if (keys.length === 1) {
    return <KeyboardChar char={keys[0].toUpperCase()} />;
  }

  return (
    <>
      {keys.map((key, index) => (
        <Fragment key={key}>
          <KeyboardChar char={key.toUpperCase()} />
          {index < keys.length - 1 && separator}
        </Fragment>
      ))}
    </>
  );
}
