import { Section, Text } from '@react-email/components';

export default function EmailFooter() {
  return (
    <Section
      style={{
        background: '#FAFAFA',
        borderTop: '1px solid #E6E6E6',
        marginTop: '40px',
      }}>
      <div style={{ padding: '32px' }}>
        <Text
          style={{
            color: '#3F3F46',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '18px',
            margin: '0 auto',
            maxWidth: '400px',
            textAlign: 'center',
          }}>
          This email is sent in accordance to our Terms of Service, which allows
          us to contact you regarding our services.
        </Text>
        <Text
          style={{
            color: '#3F3F46',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '18px',
            margin: '32px 0 8px 0',
            textAlign: 'center',
          }}>
          Our mailing address:
        </Text>
        <Text
          style={{
            color: '#3F3F46',
            fontSize: '14px',
            lineHeight: '18px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
          Codeney Pte. Ltd., 30 Cecil Street, #19-08 Prudential Tower, Singapore
          049712
        </Text>
      </div>
    </Section>
  );
}
