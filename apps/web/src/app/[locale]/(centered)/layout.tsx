import GlobalBanner from '~/components/global/banners/GlobalBanner';
import FooterInterviews from '~/components/global/footers/FooterInterviews';
import Navbar from '~/components/global/navbar/NavbarImpl';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function StandardLayout({ children }: Props) {
  return (
    <>
      <GlobalBanner />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-grow items-center">{children}</div>
        <Section>
          <FooterInterviews />
        </Section>
      </div>
    </>
  );
}
