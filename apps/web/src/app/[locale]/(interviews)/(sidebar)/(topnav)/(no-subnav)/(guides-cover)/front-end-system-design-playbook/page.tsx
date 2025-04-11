import type { Metadata } from 'next/types';

import { getGuidesData } from '~/data/Guides';

import FrontEndSystemDesignPlaybookPage from '~/components/guides/books/front-end-system-design/FrontEndSystemDesignPlaybookPage';
import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';

import { readFrontEndSystemDesignGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const listType: QuestionListTypeData = {
  type: 'format',
  value: 'system-design',
};

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function getPageSEOMetadata({ locale }: Props['params']) {
  const intl = await getIntlServerOnly(locale);
  const guidesData = getGuidesData(intl);
  const socialTitle = guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.name;

  return {
    description: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.description,
    href: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.href,
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

  const [
    allGuides,
    { questions },
    questionCompletionCount,
    { title, description, socialTitle, href },
  ] = await Promise.all([
    readFrontEndSystemDesignGuides(params.locale),
    fetchQuestionsList(listType, locale),
    fetchQuestionsCompletionCount(['system-design']),
    getPageSEOMetadata(params),
  ]);

  return (
    <FrontEndSystemDesignPlaybookPage
      allGuides={allGuides}
      listType={listType}
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
