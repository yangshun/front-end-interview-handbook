import type { Metadata } from 'next/types';

import { basePath } from '~/components/guides/books/BehavioralInterviewPlaybookNavigation';
import ReactInterviewPlaybookPage from '~/components/guides/books/ReactInterviewPlaybookPage';

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
  const socialTitle = intl.formatMessage({
    defaultMessage: 'React Interview Playbook',
    description: 'Social title for React interview playbook cover page',
    id: 'CnobOB',
  });

  return {
    description: intl.formatMessage({
      defaultMessage:
        'The definitive guide to React interviews written by Ex-FAANG interviewers. Find out what to expect, the different types of questions and how to prepare.',
      description: 'Page description for React interview playbook cover page',
      id: 'VbwnB/',
    }),
    href: basePath,
    ogImageTitle: socialTitle,
    socialTitle: `${socialTitle} | GreatReact`,
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
  const [allGuides, { title, description, socialTitle, href }] =
    await Promise.all([
      readReactInterviewPlaybookGuides({ locale }),
      getPageSEOMetadata({ params }),
    ]);

  return (
    <ReactInterviewPlaybookPage
      allGuides={allGuides}
      metadata={{
        description,
        href,
        title: socialTitle || title,
      }}
    />
  );
}
