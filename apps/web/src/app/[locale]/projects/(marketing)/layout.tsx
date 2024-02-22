import GlobalBanner from '~/components/global/banners/GlobalBanner';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import FooterProjects from '~/components/global/footers/FooterProjects';
import Navbar from '~/components/global/navbar/NavbarImpl';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsMarketingLayout({ children }: Props) {
  return (
    <>
      <FeedbackWidget position="end" />
      <GlobalBanner />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="grow">{children}</div>
        <Section>
          <FooterProjects />
        </Section>
      </div>
    </>
  );
}
