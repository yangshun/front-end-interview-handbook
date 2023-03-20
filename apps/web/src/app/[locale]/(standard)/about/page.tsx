import type { Metadata } from 'next/types';

import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import defaultMetadata from '~/seo/defaultMetadata';

import About from './about.mdx';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description:
      'Find out more about the team who built GreatFrontEnd and why we did it',
    pathname: '/about',
    title: 'About Us',
  });
}

export default function Page() {
  return (
    <Container variant="narrow">
      <Prose>
        <div className="my-20 lg:max-w-prose">
          <About />
        </div>
      </Prose>
    </Container>
  );
}
