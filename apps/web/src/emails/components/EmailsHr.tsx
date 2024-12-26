import { Hr } from '@react-email/components';

type Props = React.ComponentProps<'strong'>;

const hr = { borderColor: '#E6E6E6', marginBottom: 40, marginTop: 40 };

export default function EmailsHr({ style, ...props }: Props) {
  return (
    <Hr
      style={{
        ...hr,
        ...style,
      }}
      {...props}
    />
  );
}
