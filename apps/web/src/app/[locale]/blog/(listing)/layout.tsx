import clsx from 'clsx';

import BlogMainLayout from '~/components/blog/layout/BlogMainLayout';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function ExploreLayout({ children }: Props) {
  return (
    <BlogMainLayout>
      <Container
        className={clsx('flex flex-col', 'gap-y-8 md:gap-y-10 2xl:gap-y-12')}
        width="app">
        {children}
      </Container>
    </BlogMainLayout>
  );
}
