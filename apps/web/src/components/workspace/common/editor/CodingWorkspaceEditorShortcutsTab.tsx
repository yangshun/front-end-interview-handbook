import clsx from 'clsx';

import CodingWorkspaceEditorShortcuts from './CodingWorkspaceEditorShortcuts';

export default function CodingWorkspaceEditorShortcutsTab() {
  return (
    <div className={clsx('px-3 py-2 sm:px-3.5', 'mx-auto w-full max-w-3xl')}>
      <CodingWorkspaceEditorShortcuts />
    </div>
  );
}
