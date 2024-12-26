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
      <Row key={title} style={{ marginTop: index > 0 ? 20 : 0 }}>
        <Column style={{ height: 50, width: 50 }}>
          <Text style={numberCircle}>
            <span style={{ display: 'inline-block', padding: 5 }}>
              {index + 1}
            </span>
          </Text>
        </Column>
        <Column
          style={{
            paddingBottom: 8,
            paddingTop: 8,
          }}>
          <Text style={{ ...textBody0, fontWeight: 600 }}>{title}</Text>
          <Text style={{ ...paragraph, marginTop: 4 }}>{subtitle}</Text>
        </Column>
      </Row>
    </Link>
  );
}

const textBody0 = {
  color: '#18181B',
  fontSize: 18,
  lineHeight: '28px',
  margin: 0,
};

const paragraph = {
  color: '#18181B',
  fontSize: 16,
  lineHeight: '24px',
  margin: 0,
};

const numberCircle = {
  border: '2px solid #7C7C7C',
  borderRadius: '50%',
  color: '#BEBEBE',
  display: 'block',
  fontSize: 16,
  fontWeight: 600,
  height: 32,
  margin: 0,
  marginRight: 24,
  textAlign: 'center' as const,
  width: 32,
};
