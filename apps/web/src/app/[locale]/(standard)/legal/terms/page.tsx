import type { Metadata } from 'next/types';

import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import defaultMetadata from '~/seo/defaultMetadata';

import Terms from './terms.mdx';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/legal/terms',
    title: 'Terms of Service',
  });
}

export default function Page() {
  return (
    <Container variant="narrow">
      <Prose>
        <div className="my-20">
          <Terms />
        </div>
      </Prose>
    </Container>
  );
}
