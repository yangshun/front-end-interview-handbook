import type { CSSProperties } from 'react';

import { Text } from '@react-email/components';

type EmailsParagraphColor = 'default' | 'secondary' | 'subtitle';
type EmailsParagraphSize = 'body0' | 'body1' | 'body2' | 'body3';
type EmailsParagraphWeight = 'bold' | 'medium' | 'normal';

type Props = React.ComponentProps<typeof Text> &
  Readonly<{
    color?: EmailsParagraphColor;
    defaultMargins?: boolean;
    size?: EmailsParagraphSize;
    weight?: EmailsParagraphWeight;
  }>;

const sizeStyles: Record<EmailsParagraphSize, CSSProperties> = {
  body0: {
    fontSize: 18,
    lineHeight: '28px',
  },
  body1: {
    fontSize: 16,
    lineHeight: '24px',
  },
  body2: {
    fontSize: 14,
    lineHeight: '20px',
  },
  body3: {
    fontSize: 12,
    lineHeight: '16px',
  },
};

const defaultMarginStyles: Record<EmailsParagraphSize, CSSProperties> = {
  body0: {
    marginBottom: 28,
    marginTop: 28,
  },
  body1: {
    marginBottom: 24,
    marginTop: 24,
  },
  body2: {
    marginBottom: 20,
    marginTop: 20,
  },
  body3: {
    marginBottom: 16,
    marginTop: 16,
  },
};

const weightStyles: Record<EmailsParagraphWeight, CSSProperties> = {
  bold: {
    fontWeight: 600,
  },
  medium: {
    fontWeight: 500,
  },
  normal: {
    fontWeight: 400,
  },
};

const colorStyles: Record<EmailsParagraphColor, CSSProperties> = {
  default: {
    color: '#18181b',
  },
  secondary: {
    color: '#52525b',
  },
  subtitle: {
    color: '#3f3f46',
  },
};

export default function EmailsParagraph({
  color = 'default',
  size = 'body1',
  style,
  weight = 'normal',
  defaultMargins = false,
  ...props
}: Props) {
  return (
    <Text
      style={{
        ...(defaultMargins ? defaultMarginStyles[size] : { margin: 0 }),
        ...colorStyles[color],
        ...weightStyles[weight],
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    />
  );
}
