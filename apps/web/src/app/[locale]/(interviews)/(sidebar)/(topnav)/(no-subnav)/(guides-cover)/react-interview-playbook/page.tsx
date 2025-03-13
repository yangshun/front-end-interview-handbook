import type { Metadata } from 'next/types';

import { getGuidesData } from '~/data/Guides';

import ReactInterviewPlaybookPage from '~/components/guides/books/react-interview-playbook/ReactInterviewPlaybookPage';

import { readReactInterviewPlaybookGuides } from '~/db/guides/GuidesReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function getPageSEOMetadata({ params }: Props) {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);
  const guidesData = getGuidesData(intl);
  const socialTitle = guidesData.REACT_INTERVIEW_PLAYBOOK.name;

  return {
    description: guidesData.REACT_INTERVIEW_PLAYBOOK.description,
    href: guidesData.REACT_INTERVIEW_PLAYBOOK.href,
    ogImageTitle: socialTitle,
    socialTitle: `${socialTitle} | GreatFrontEnd`,
    title: intl.formatMessage({
      defaultMessage: 'React Interview Playbook: Everything you need to excel',
      description: 'Page title for React interview playbook cover page',
      id: 'NtcWrM',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, socialTitle, href, ogImageTitle } =
    await getPageSEOMetadata({
      params,
    });

  return defaultMetadata({
    description,
    locale,
    ogImageTitle,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [allGuides] = await Promise.all([
    readReactInterviewPlaybookGuides({ locale }),
  ]);

  return <ReactInterviewPlaybookPage allGuides={allGuides} />;
}
