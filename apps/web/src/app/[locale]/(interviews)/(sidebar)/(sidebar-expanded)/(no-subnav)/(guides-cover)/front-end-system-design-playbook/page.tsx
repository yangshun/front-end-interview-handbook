import type { Metadata } from 'next/types';

import FrontEndSystemDesignPlaybookPage from '~/components/interviews/guides/FrontEndSystemDesignPlaybookPage';
import { basePath } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';

import { readAllFrontendSystemDesignGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsListSystemDesign } from '~/db/QuestionsListReader';
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
        'The definitive guide to Front End System Design interviews. Learn useful techniques and how to approach the most common questions. Written by Ex-FAANG interviewers.',
      description:
        'Page description for frontend system design playbook cover page',
      id: 'O237FB',
    }),
    href: basePath,
    socialTitle: intl.formatMessage({
      defaultMessage: 'Front End System Design Playbook | GreatFrontEnd',
      description:
        'Social title for frontend system design playbook cover page',
      id: 'E9XW96',
    }),
    title: intl.formatMessage({
      defaultMessage: 'Front End System Design Playbook: All-in-one Deep Dive',
      description: 'Page title for frontend system design playbook cover page',
      id: '6hhGip',
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
  const { locale } = params;

  const [
    allGuides,
    { questions },
    questionCompletionCount,
    { title, description, socialTitle, href },
  ] = await Promise.all([
    readAllFrontendSystemDesignGuides(params.locale),
    fetchQuestionsListSystemDesign(locale),
    fetchQuestionCompletionCount(['system-design']),
    getPageSEOMetadata({ params }),
  ]);

  return (
    <FrontEndSystemDesignPlaybookPage
      allGuides={allGuides}
      metadata={{
        description,
        href,
        title: socialTitle || title,
      }}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
    />
  );
}
