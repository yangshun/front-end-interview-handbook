import EmailFooter from '~/emails/components/EmailFooter';

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
} from '@react-email/components';

type Props = Readonly<{
  mostUsedCountry: string;
  name: string;
}>;

export default function EmailCheckoutFirstTime({
  name,
  mostUsedCountry,
}: Props) {
  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,800;1,14..32,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Img
            height="auto"
            src="https://bmygeefzuragewmbhlby.supabase.co/storage/v1/object/public/emails/logo.png"
            style={{
              marginBottom: '64px',
            }}
            width="53"
          />
          <Heading as="h1" style={heading}>
            Thank You For Joining GreatFrontEnd!
          </Heading>
          <Section style={body}>
            <Section>
              <Text style={paragraph}>Hi {name},</Text>
              <Text style={{ ...paragraph, margin: '16px 0 0 0' }}>
                How's it going? Thank you for your interest in GreatFrontEnd!
              </Text>
              <Text style={{ ...paragraph, margin: '16px 0 0 0' }}>
                I'm{' '}
                <span style={bold}>Yangshun, co-founder at GreatFrontEnd</span>.
                I spent over 5 years at Meta leading teams and building
                front-end products like{' '}
                <Link
                  href="https://meta.com"
                  style={{
                    ...paragraph,
                    textDecoration: 'underline',
                  }}>
                  meta.com
                </Link>{' '}
                and{' '}
                <Link
                  href="https://docusaurus.io/"
                  style={{
                    ...paragraph,
                    textDecoration: 'underline',
                  }}>
                  Docusaurus
                </Link>
                , and I'm very passionate about front-end engineering.
              </Text>
              <Text style={paragraph}>
                I always felt that the resources available for the front-end
                interview space were very lacking. Hence, last year, I left Meta
                to work on GreatFrontEnd. At GreatFrontEnd, we are on a mission
                to build great products for front-end engineers, and we're just
                getting started.
              </Text>
              <Text style={paragraph}>
                I'm thrilled that you're considering purchasing GreatFrontEnd.
                Do let me know if there are any questions you might have, I'd be
                happy to answer them. I'd also love to hear what you're looking
                for in your interview preparation and how we can help you.
              </Text>
              <Text style={paragraph}>
                <Link
                  href="https://www.linkedin.com/in/yangshun"
                  style={{
                    ...paragraph,
                    textDecoration: 'underline',
                  }}>
                  Do connect with me on LinkedIn
                </Link>{' '}
                for front end nuggets and software engineering content.
              </Text>
              <Text style={paragraph}>
                This is not an automated email, I manually sent this and your
                reply goes directly into my inbox.
              </Text>
              <Text style={paragraph}>
                P.S. Many of our users are from{' '}
                <span style={bold}>{mostUsedCountry}</span> and they have
                benefited greatly from our products.
              </Text>
              <br />
              <Text style={paragraph}>
                Regards,
                <br />
                Yangshun from GreatFrontEnd
              </Text>
            </Section>
            <EmailFooter />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#fff',
  color: '#18181B',
  fontFamily:
    'Inter, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  marginTop: '30px',
  maxWidth: '600px',
};

const heading = {
  color: '#18181B',
  fontSize: '1.875rem',
  fontWeight: 600,
  lineHeight: '2.5rem',
  margin: '40px 0 0 0',
};

const body = {
  margin: '40px 0 0 0',
};

const paragraph = {
  color: '#3F3F46',
  fontSize: '1rem',
  lineHeight: '1.5rem',
};

const bold = {
  color: '#18181B',
  fontWeight: 600,
};
