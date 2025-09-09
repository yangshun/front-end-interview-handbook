'use client';

import { RiKeyboardBoxLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import SlideOut from '~/components/ui/SlideOut';

import CodingWorkspaceEditorShortcuts from './CodingWorkspaceEditorShortcuts';

export default function CodingWorkspaceEditorShortcutsButton() {
  const intl = useIntl();

  return (
    <div>
      <SlideOut
        enterFrom="end"
        size="md"
        title={intl.formatMessage({
          defaultMessage: 'Editor Shortcuts',
          description: 'Label for slideout for code editor shortcuts',
          id: 'yM3vbW',
        })}
        trigger={
          <Button
            icon={RiKeyboardBoxLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Keyboard shortcuts',
              description: 'Label for keyboard shortcuts menu item',
              id: 'BJ0Mm1',
            })}
            size="xs"
            tooltip={intl.formatMessage({
              defaultMessage: 'Keyboard shortcuts',
              description: 'Label for keyboard shortcuts menu item',
              id: 'BJ0Mm1',
            })}
            variant="tertiary"
          />
        }>
        <CodingWorkspaceEditorShortcuts />
      </SlideOut>
    </div>
  );
}
