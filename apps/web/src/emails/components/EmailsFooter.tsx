import { EmailsLink,EmailsParagraph } from './EmailsComponents';

import { Section } from '@react-email/components';

export default function EmailsFooter() {
  return (
    <Section
      style={{
        background: '#FAFAFA',
        marginTop: 40,
      }}>
      <div style={{ padding: 32 }}>
        <EmailsParagraph
          color="subtitle"
          size="body2"
          style={{
            margin: '0 auto',
            maxWidth: 400,
            textAlign: 'center',
          }}>
          This email is sent in accordance to our{' '}
          <EmailsLink
            href="https://www.greatfrontend.com/legal/terms"
            style={{ fontWeight: 500 }}>
            Terms of Service
          </EmailsLink>
          , which allows us to contact you regarding our services.
        </EmailsParagraph>
        <EmailsParagraph
          color="subtitle"
          size="body2"
          style={{
            marginBottom: 8,
            marginTop: 32,
            textAlign: 'center',
          }}
          weight="bold">
          Our mailing address:
        </EmailsParagraph>
        <EmailsParagraph
          color="subtitle"
          size="body2"
          style={{
            textAlign: 'center',
          }}>
          Codeney Pte. Ltd., 30 Cecil Street, #19-08 Prudential Tower, Singapore
          049712
        </EmailsParagraph>
      </div>
    </Section>
  );
}
