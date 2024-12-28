import url from 'url';

import { getSiteOrigin } from '~/seo/siteUrl';

import { EmailsLink, EmailsParagraph } from './EmailsComponents';
import type { EmailContactListKey } from '../EmailsTypes';

import { Section } from '@react-email/components';

type Props = Readonly<{
  unsub?: Readonly<{
    email: string;
    hash: string;
    list: EmailContactListKey;
  }>;
}>;

export default function EmailsFooter({ unsub }: Props) {
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
            href={new URL('/legal/terms', getSiteOrigin()).toString()}
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
        {unsub && (
          <>
            <EmailsParagraph
              color="subtitle"
              size="body2"
              style={{
                marginTop: 32,
                textAlign: 'center',
              }}>
              Want to change how you receive these emails?
            </EmailsParagraph>
            <EmailsParagraph
              color="subtitle"
              size="body2"
              style={{
                marginTop: 4,
                textAlign: 'center',
              }}
              weight="medium">
              <EmailsLink
                href={new URL(
                  url.format({
                    pathname: '/emails/unsubscribe',
                    query: {
                      email: encodeURIComponent(unsub.email),
                      hash: encodeURIComponent(unsub.hash),
                      list: encodeURIComponent(unsub.list),
                    },
                  }),
                  getSiteOrigin(),
                ).toString()}>
                Unsubscribe
              </EmailsLink>
            </EmailsParagraph>
          </>
        )}
      </div>
    </Section>
  );
}
