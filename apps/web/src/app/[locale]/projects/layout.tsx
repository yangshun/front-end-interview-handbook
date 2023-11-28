import GlobalBanner from '~/components/global/banners/GlobalBanner';
import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import Footer from '~/components/global/Footer';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function StandardLayout({ children }: Props) {
  return (
    <>
      <FeedbackWidget position="end" />
      <GlobalBanner />
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow">{children}</div>
        <Section>
          <Footer />
        </Section>
      </div>
    </>
  );
}
