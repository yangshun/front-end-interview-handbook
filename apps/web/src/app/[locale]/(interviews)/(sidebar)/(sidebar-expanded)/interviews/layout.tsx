import clsx from 'clsx';

import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function InterviewsLayout({ children }: Props) {
  return (
    <Container
      className={clsx(
        'flex flex-col',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
        'py-4 md:py-6 lg:py-8 xl:py-16',
      )}
      width="app">
      {children}
    </Container>
  );
}
