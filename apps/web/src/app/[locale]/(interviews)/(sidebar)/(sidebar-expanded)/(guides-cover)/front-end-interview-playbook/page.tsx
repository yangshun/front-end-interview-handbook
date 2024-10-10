import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import FrontEndInterviewPlaybookPage from './FrontEndInterviewPlaybookPage';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function getPageSEOMetadata({ params }: Props) {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return {
    description: intl.formatMessage({
      defaultMessage:
        'The definitive guide to front end interviews written by Ex-FAANG interviewers. Find out what to expect, the different types of questions and how to prepare.',
      description:
        'Page description for frontend interview playbook cover page',
      id: 'qI3Dry',
    }),
    href: '/front-end-interview-playbook',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Playbook | GreatFrontEnd',
      description: 'Social title for frontend interview playbook cover page',
      id: '4De8x6',
    }),
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

  const { title, description, socialTitle, href } = await getPageSEOMetadata({
    params,
  });

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const allGuides = await readAllFrontEndInterviewGuides(params.locale);

  return <FrontEndInterviewPlaybookPage allGuides={allGuides} />;
}
