import { Link } from '@react-email/components';

type Props = React.ComponentProps<typeof Link>;

export default function EmailsLink({ style, ...props }: Props) {
  return (
    <Link
      style={{
        textDecoration: 'underline',
        ...style,
      }}
      {...props}
    />
  );
}
