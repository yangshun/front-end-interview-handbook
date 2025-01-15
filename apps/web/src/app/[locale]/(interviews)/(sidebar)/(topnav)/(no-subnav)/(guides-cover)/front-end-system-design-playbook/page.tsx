import type { Metadata } from 'next/types';

import FrontEndSystemDesignPlaybookPage from '~/components/interviews/guides/FrontEndSystemDesignPlaybookPage';
import { basePath } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';

import { readAllFrontendSystemDesignGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
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
    defaultMessage: 'Front End System Design Playbook',
    description: 'Social title for frontend system design playbook cover page',
    id: 'qpQlsV',
  });

  return {
    description: intl.formatMessage({
      defaultMessage:
        'The definitive guide to Front End System Design interviews. Learn useful techniques and how to approach the most common questions. Written by Ex-FAANG interviewers.',
      description:
        'Page description for frontend system design playbook cover page',
      id: 'O237FB',
    }),
    href: basePath,
    ogImageTitle: socialTitle,
    socialTitle: `${socialTitle} | GreatFrontEnd`,
    title: intl.formatMessage({
      defaultMessage: 'Front End System Design Playbook: All-in-one Deep Dive',
      description: 'Page title for frontend system design playbook cover page',
      id: '6hhGip',
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

  const [
    allGuides,
    { questions },
    questionCompletionCount,
    { title, description, socialTitle, href },
  ] = await Promise.all([
    readAllFrontendSystemDesignGuides(params.locale),
    fetchQuestionsList({ type: 'format', value: 'system-design' }, locale),
    fetchQuestionsCompletionCount(['system-design']),
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
