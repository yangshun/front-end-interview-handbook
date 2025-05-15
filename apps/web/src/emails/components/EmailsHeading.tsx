import { Heading } from '@react-email/components';
import type { CSSProperties } from 'react';

type EmailsHeadingLevel = 'heading1' | 'heading2';
type Props = React.ComponentProps<typeof Heading> &
  Readonly<{
    level: EmailsHeadingLevel;
  }>;

const levelStyles: Record<EmailsHeadingLevel, CSSProperties> = {
  heading1: {
    fontSize: 28,
    letterSpacing: '-1.25px',
    lineHeight: '32px',
  },
  heading2: {
    fontSize: 24,
    lineHeight: '32px',
  },
};

export default function EmailsHeading({ level, style, ...props }: Props) {
  return (
    <Heading
      style={{
        color: '#18181b',
        fontWeight: 600,
        margin: 0,
        ...levelStyles[level],
        ...style,
      }}
      {...props}
    />
  );
}
