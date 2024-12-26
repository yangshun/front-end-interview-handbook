import { Button } from '@react-email/components';

type EmailsButtonVariant = 'primary' | 'projects';
type Props = React.ComponentProps<typeof Button> &
  Readonly<{
    variant: EmailsButtonVariant;
  }>;

const backgroundColors: Record<EmailsButtonVariant, string> = {
  primary: '#016ffa',
  projects: '#6bd08d',
};

export default function EmailsButton({ variant, style, ...props }: Props) {
  return (
    <Button
      style={{
        backgroundColor: backgroundColors[variant],
        borderRadius: 40,
        color: '#fff',
        fontSize: 16,
        fontWeight: 500,
        padding: '10px 20px',
        ...style,
      }}
      {...props}
    />
  );
}
