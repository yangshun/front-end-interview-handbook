import { Column, Link, Row, Text } from '@react-email/components';
import type { ReactNode } from 'react';

import { EmailsParagraph } from './EmailsComponents';

type Props = Readonly<{
  href: string;
  index: number;
  subtitle: ReactNode | string;
  title: string;
}>;

export default function EmailsNumberedPairText({
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
            <span style={{ display: 'inline-block', padding: 4 }}>
              {index + 1}
            </span>
          </Text>
        </Column>
        <Column
          style={{
            paddingBottom: 8,
            paddingTop: 8,
          }}>
          <EmailsParagraph size="body0" weight="bold">
            {title} →
          </EmailsParagraph>
          <EmailsParagraph style={{ marginTop: 4 }}>{subtitle}</EmailsParagraph>
        </Column>
      </Row>
    </Link>
  );
}

const numberCircle = {
  background: '#066FFA',
  borderRadius: '50%',
  color: '#FFFFFF',
  display: 'block',
  fontSize: 16,
  fontWeight: 600,
  height: 32,
  margin: 0,
  marginRight: 24,
  textAlign: 'center' as const,
  width: 32,
};
