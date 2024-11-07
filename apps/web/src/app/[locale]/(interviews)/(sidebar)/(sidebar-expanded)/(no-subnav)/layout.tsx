import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  return (
    <Container className="py-8 xl:py-12" width="app">
      {children}
    </Container>
  );
}
