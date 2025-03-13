import type { Metadata } from 'next/types';

import { getGuidesData } from '~/data/Guides';

import BehavioralInterviewPlaybookPage from '~/components/guides/books/behavioral-interview-playbook/BehavioralInterviewPlaybookPage';

import { readBehavioralInterviewPlaybookGuides } from '~/db/guides/GuidesReader';
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
  const socialTitle = guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.name;

  return {
    description: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.description,
    href: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.href,
    ogImageTitle: socialTitle,
    socialTitle: `${socialTitle} | GreatFrontEnd`,
    title: intl.formatMessage({
      defaultMessage:
        'Behavioral Interview Playbook | Made For Front End Engineers',
      description: 'Page title for behavioral interview playbook cover page',
      id: 'K2TQiz',
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
  const allGuides = await readBehavioralInterviewPlaybookGuides(locale);

  return <BehavioralInterviewPlaybookPage allGuides={allGuides} />;
}
