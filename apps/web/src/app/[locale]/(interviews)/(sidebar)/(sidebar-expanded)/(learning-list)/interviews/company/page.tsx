import { allInterviewsCompanyGuides } from 'contentlayer/generated';
import type { Metadata } from 'next/types';

import InterviewsCompanyGuideListPage from '~/components/interviews/company/InterviewsCompanyGuideListPage';

import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  return defaultMetadata({
    description: `Ace your front end interviews with your dream companies with our company-specific guides`,
    locale,
    pathname: `/interviews/company`,
    title: 'Front end interviews company guides',
  });
}

export default async function Page() {
  const sortedGuides = allInterviewsCompanyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  return <InterviewsCompanyGuideListPage companyGuides={sortedGuides} />;
}
