import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsCompanyGuideListPage from '~/components/interviews/company/InterviewsCompanyGuideListPage';

import { fetchInterviewsCompanyGuides } from '~/db/contentlayer/InterviewsCompanyGuideReader';
import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  return defaultMetadata({
    description: `Ace your front end engineer interviews with your dream companies with our company-specific guides`,
    locale,
    pathname: `/interviews/company`,
    title: 'Front end interviews company guides',
  });
}

export default async function Page() {
  const [companyGuides, bottomContent] = await Promise.all([
    fetchInterviewsCompanyGuides(),
    fetchInterviewListingBottomContent('company'),
  ]);
  const sortedGuides = companyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <InterviewsCompanyGuideListPage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      companyGuides={sortedGuides}
    />
  );
}
