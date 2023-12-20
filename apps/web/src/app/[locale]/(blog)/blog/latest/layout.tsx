import clsx from 'clsx';

import BlogMainLayout from '~/components/blog/BlogMainLayout';
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
        )}
        variant="normal">
        <div
          className={clsx(
            'mx-auto w-full lg:!max-w-[calc(720px_-_1.5rem)] xl:!max-w-[calc(720px_-_1rem)]',
          )}>
          {children}
        </div>
      </Container>
    </BlogMainLayout>
  );
}
