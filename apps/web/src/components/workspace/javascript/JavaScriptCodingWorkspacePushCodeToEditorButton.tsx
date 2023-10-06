import { RiArrowRightLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';

export default function JavaScriptCodingWorkspacePushCodeToEditorButton({
  contents,
}: Readonly<{ contents: string }>) {
  const { replaceMainEditorContents } = useJavaScriptCodingWorkspaceContext();

  if (replaceMainEditorContents == null) {
    return null;
  }

  return (
    <Button
      icon={RiArrowRightLine}
      isLabelHidden={true}
      label="Replace editor with code"
      size="xs"
      tooltip="Replace editor with code"
      variant="secondary"
      onClick={() => {
        replaceMainEditorContents(contents);
      }}
    />
  );
}
