'use client';

import { RiArrowRightLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';

export default function JavaScriptCodingWorkspacePushCodeToEditorButton({
  contents,
}: Readonly<{ contents: string }>) {
  const intl = useIntl();
  const { replaceMainEditorContents } = useJavaScriptCodingWorkspaceContext();

  if (replaceMainEditorContents == null) {
    return null;
  }

  return (
    <Button
      icon={RiArrowRightLine}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Replace editor with code',
        description: 'Coding workspace replace editor with code label',
        id: 'x8JeGI',
      })}
      size="xs"
      tooltip={intl.formatMessage({
        defaultMessage: 'Replace editor with code',
        description: 'Coding workspace replace editor with code label',
        id: 'x8JeGI',
      })}
      variant="secondary"
      onClick={() => {
        replaceMainEditorContents(contents);
      }}
    />
  );
}
