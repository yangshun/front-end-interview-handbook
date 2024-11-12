import type { Metadata } from 'next/types';

import { basePath } from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import BehavioralInterviewPlaybookPage from '~/components/interviews/guides/BehavioralInterviewPlaybookPage';

import { readAllBehavioralGuides } from '~/db/guides/GuidesReader';
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

  return {
    description: intl.formatMessage({
      defaultMessage:
        'The definitive guide to behavioral interviews for front end engineers. Written by Ex-FAANG interviewers. Find out what to expect and how to prepare.',
      description:
        'Page description for behavioral interview playbook cover page',
      id: 'zqIbYm',
    }),
    href: basePath,
    socialTitle: intl.formatMessage({
      defaultMessage: 'Behavioral Interview Playbook | GreatFrontEnd',
      description: 'Social title for behavioral interview playbook cover page',
      id: 'Pv/QiZ',
    }),
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
  const allGuides = await readAllBehavioralGuides(params.locale);

  return <BehavioralInterviewPlaybookPage allGuides={allGuides} />;
}
