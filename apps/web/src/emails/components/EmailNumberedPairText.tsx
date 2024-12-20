import type { ReactNode } from 'react';

import { Column, Link, Row, Text } from '@react-email/components';

type Props = Readonly<{
  href: string;
  index: number;
  subtitle: ReactNode | string;
  title: string;
}>;

export default function EmailNumberedPairText({
  href,
  title,
  subtitle,
  index,
}: Props) {
  return (
    <Link href={href}>
      <Row key={title} style={{ marginTop: index > 0 ? '20px' : '0' }}>
        <Column style={{ height: 50, width: 50 }}>
          <Text style={numberCircle}>
            <span style={{ display: 'inline-block', padding: '5px' }}>
              {index + 1}
            </span>
          </Text>
        </Column>
        <Column
          style={{
            padding: '8px 0',
          }}>
          <Text style={{ ...textBody0, fontWeight: 600 }}>{title}</Text>
          <Text style={{ ...paragraph, margin: '4px 0 0 0' }}>{subtitle}</Text>
        </Column>
      </Row>
    </Link>
  );
}

const textBody0 = {
  color: '#18181B',
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  margin: 0,
};

const paragraph = {
  color: '#18181B',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  margin: 0,
};

const numberCircle = {
  border: '2px solid #7C7C7C',
  borderRadius: '50%',
  color: '#BEBEBE',
  display: 'block',
  fontSize: '1.563rem',
  fontWeight: 600,
  height: '46px',
  lineHeight: '2.083rem',
  margin: 0,
  marginRight: '24px',
  textAlign: 'center' as const,
  width: '46px',
};
