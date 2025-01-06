import { Img, Section } from '@react-email/components';

type Props = Omit<React.ComponentProps<typeof Section>, 'align'> &
  Readonly<{
    align?: 'center' | 'start';
  }>;

export default function EmailsHeader({
  align = 'start',
  style,
  ...props
}: Props) {
  return (
    <Section style={{ height: 68, ...style }} {...props}>
      <Img
        height="40"
        src="https://emails.gfecdn.net/logos/logo-gray.png"
        style={align === 'center' ? { margin: '0 auto' } : undefined}
      />
    </Section>
  );
}
