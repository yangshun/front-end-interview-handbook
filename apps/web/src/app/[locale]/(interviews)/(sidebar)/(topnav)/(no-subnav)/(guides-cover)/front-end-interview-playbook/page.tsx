import type { Metadata } from 'next/types';

import { getGuidesData } from '~/data/Guides';

import FrontEndInterviewPlaybookPage from '~/components/guides/books/front-end-interview-playbook/FrontEndInterviewPlaybookPage';

import { readFrontEndInterviewPlaybookGuides } from '~/db/guides/GuidesReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function getPageSEOMetadata({ locale }: Props['params']) {
  const intl = await getIntlServerOnly(locale);
  const guidesData = getGuidesData(intl);
  const socialTitle = guidesData.FRONT_END_INTERVIEW_PLAYBOOK.name;

  return {
    description: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.description,
    href: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.href,
    ogImageTitle: socialTitle,
    socialTitle: `${socialTitle} | GreatFrontEnd`,
    title: intl.formatMessage({
      defaultMessage:
        'Front End Interview Playbook: Everything you need to excel',
      description: 'Page title for frontend interview playbook cover page',
      id: 'hALSD8',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, socialTitle, href, ogImageTitle } =
    await getPageSEOMetadata(params);

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
  const [allGuides, { title, description, socialTitle, href }] =
    await Promise.all([
      readFrontEndInterviewPlaybookGuides({ locale }),
      getPageSEOMetadata(params),
    ]);

  return (
    <FrontEndInterviewPlaybookPage
      allGuides={allGuides}
      metadata={{
        description,
        href,
        title: socialTitle || title,
      }}
    />
  );
}
