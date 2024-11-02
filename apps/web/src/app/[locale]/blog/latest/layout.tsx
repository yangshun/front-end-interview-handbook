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
        className={clsx(
          'flex flex-col',
          'py-6 lg:py-8',
          'gap-y-8 md:gap-y-10 2xl:gap-y-12',
          // Workaround to make inner contents always 1080px on >= lg screens
          'lg:!max-w-[calc(1080px_+_4rem)] xl:!max-w-[calc(1080px_+_7.5rem)]',
        )}
        width="7xl">
        <div className="lg:max-w-4xl">{children}</div>
      </Container>
    </BlogMainLayout>
  );
}
