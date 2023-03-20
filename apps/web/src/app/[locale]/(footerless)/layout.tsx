import Navbar from '~/components/global/navbar/NavbarImpl';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function FooterlessLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
