import { GlobalBannerInterviews } from '~/components/global/banners/GlobalBannerInterviews';
import InterviewsFooter from '~/components/interviews/common/InterviewsFooter';
import InterviewsNavbar from '~/components/interviews/common/InterviewsNavbar';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function StandardLayout({ children }: Props) {
  return (
    <>
      <GlobalBannerInterviews />
      <div className="flex min-h-screen flex-col">
        <InterviewsNavbar />
        <div className="flex grow items-center">{children}</div>
        <Section>
          <InterviewsFooter />
        </Section>
      </div>
    </>
  );
}
