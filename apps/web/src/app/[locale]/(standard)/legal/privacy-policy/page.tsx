import type { Metadata } from 'next/types';

import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import defaultMetadata from '~/seo/defaultMetadata';

import PrivacyPolicy from './privacy-policy.mdx';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/legal/privacy-policy',
    title: 'Privacy Policy',
  });
}

export default function Page() {
  return (
    <Container variant="narrow">
      <Prose>
        <div className="my-20">
          <PrivacyPolicy />
        </div>
      </Prose>
    </Container>
  );
}
