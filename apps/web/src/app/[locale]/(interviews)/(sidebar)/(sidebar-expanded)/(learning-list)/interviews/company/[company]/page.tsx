import type { Metadata } from 'next/types';
import type { IntlShape } from 'react-intl';

import { getFocusAreas } from '~/data/focus-areas/FocusAreas';

import InterviewsCompanyPage from '~/components/interviews/company/InterviewsCompanyPage';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export async function generateStaticParams() {
  // TODO(companies)
  return [];
}

type Props = Readonly<{
  params: {
    company: string;
    locale: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, company: companySlug } = params;

  return defaultMetadata({
    description: 'TODO',
    locale,
    pathname: `/interviews/${companySlug}`,
    title: 'TODO Company',
  });
}

export default async function Page({ params }: Props) {
  const { locale, company: companySlug } = params;

  const intl = await getIntlServerOnly(locale);

  // TODO: Remove this IntlShape typecast.
  const focusAreas = getFocusAreas(intl as IntlShape);
  const focusArea = focusAreas['javascript-polyfills'];

  const questions = await fetchQuestionsBySlug(focusArea.questions, locale);
  const codingQuestionsForPlan = questions.javascript.concat(
    questions['user-interface'],
  );
  const systemDesignQuestionsForPlan = questions['system-design'];
  const quizQuestionsForPlan = questions.quiz;

  return (
    <InterviewsCompanyPage
      codingQuestions={codingQuestionsForPlan}
      company={companySlug}
      focusArea={focusArea}
      quizQuestions={sortQuestions(
        quizQuestionsForPlan as ReadonlyArray<QuestionMetadata>,
        'importance',
        false,
      )}
      systemDesignQuestions={systemDesignQuestionsForPlan}
    />
  );
}
