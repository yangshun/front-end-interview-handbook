import type { ReactNode } from 'react';

import { EmailsParagraph } from './EmailsComponents';

import { Column, Link, Row, Text } from '@react-email/components';

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
          <EmailsParagraph size="body0" weight="bold">
            {title}
          </EmailsParagraph>
          <EmailsParagraph style={{ marginTop: 4 }}>{subtitle}</EmailsParagraph>
        </Column>
      </Row>
    </Link>
  );
}

const numberCircle = {
  border: '2px solid #7C7C7C',
  borderRadius: '50%',
  color: '#bebebe',
  display: 'block',
  fontSize: 16,
  fontWeight: 600,
  height: 32,
  margin: 0,
  marginRight: 24,
  textAlign: 'center' as const,
  width: 32,
};
