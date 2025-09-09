import { SandpackPreview } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  embed?: boolean;
}>;

export default function UserInterfaceCodingWorkspacePreview({
  embed = false,
}: Props) {
  return (
    <SandpackPreview
      className={
        embed
          ? 'dark:[&>.sp-preview-container]:hue-rotate-180 dark:[&>.sp-preview-container]:invert'
          : undefined
      }
      showNavigator={true}
      showOpenInCodeSandbox={false}
    />
  );
}
