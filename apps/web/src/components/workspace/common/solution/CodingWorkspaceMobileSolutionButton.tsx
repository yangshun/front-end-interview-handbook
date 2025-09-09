import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

type Props = Readonly<{
  mode?: 'practice' | 'solution';
  onModeChange: (value: 'practice' | 'solution') => void;
}>;

export default function CodingWorkspaceMobileSolutionButton({
  mode = 'practice',
  onModeChange,
}: Props) {
  const intl = useIntl();
  const label =
    mode === 'practice'
      ? intl.formatMessage({
          defaultMessage: 'Solution',
          description: 'Navigate to solution page button',
          id: '/lcG8X',
        })
      : intl.formatMessage({
          defaultMessage: 'Question',
          description: 'Navigate to question page button',
          id: 'RdY2p1',
        });

  return (
    <Button
      label={label}
      size="xs"
      variant={mode === 'solution' ? 'secondary' : 'primary'}
      onClick={() =>
        onModeChange(mode === 'practice' ? 'solution' : 'practice')
      }
    />
  );
}
