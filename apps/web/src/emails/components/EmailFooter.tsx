import { Link, Section, Text } from '@react-email/components';

export default function EmailFooter() {
  return (
    <Section
      style={{
        background: '#FAFAFA',
        marginTop: '40px',
      }}>
      <div style={{ padding: '32px' }}>
        <Text
          style={{
            color: '#3F3F46',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '18px',
            margin: '0 auto',
            maxWidth: '400px',
            textAlign: 'center',
          }}>
          This email is sent in accordance to our{' '}
          <Link
            href="https://www.greatfrontend.com/legal/terms"
            style={{ color: '#3F3F46', textDecoration: 'underline' }}>
            Terms of Service
          </Link>
          , which allows us to contact you regarding our services.
        </Text>
        <Text
          style={{
            color: '#3F3F46',
            fontSize: 14,
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
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '20px',
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
