import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

type Props = Readonly<{
  onHide: () => void;
  onResetToDefaultCode: () => void;
}>;

export default function CodingWorkspaceLoadedFilesBanner({
  onHide,
  onResetToDefaultCode,
}: Props) {
  return (
    <Banner size="xs" truncate={true} variant="primary" onHide={onHide}>
      <FormattedMessage
        defaultMessage="Your code was restored from client storage. <link>Reset to default</link>"
        description="Message that appears under the coding workspace when user has previously worked on this problem and we restored their code"
        id="2a6qgD"
        values={{
          link: (chunks) => (
            <Anchor
              className="underline"
              href="#"
              variant="unstyled"
              onClick={onResetToDefaultCode}>
              {chunks}
            </Anchor>
          ),
        }}
      />
    </Banner>
  );
}
