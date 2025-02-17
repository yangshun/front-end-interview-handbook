import type { Metadata } from 'next/types';

import { basePath } from '~/components/guides/books/BehavioralInterviewPlaybookNavigation';
import BehavioralInterviewPlaybookPage from '~/components/guides/books/BehavioralInterviewPlaybookPage';

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
  const socialTitle = intl.formatMessage({
    defaultMessage: 'Behavioral Interview Playbook',
    description: 'Social title for behavioral interview playbook cover page',
    id: 'nkY9S8',
  });

  return {
    description: intl.formatMessage({
      defaultMessage:
        'The definitive guide to behavioral interviews for front end engineers. Written by Ex-FAANG interviewers. Find out what to expect and how to prepare.',
      description:
        'Page description for behavioral interview playbook cover page',
      id: 'zqIbYm',
    }),
    href: basePath,
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
  const guides = await readBehavioralInterviewPlaybookGuides(params.locale);

  return <BehavioralInterviewPlaybookPage guides={guides} />;
}
