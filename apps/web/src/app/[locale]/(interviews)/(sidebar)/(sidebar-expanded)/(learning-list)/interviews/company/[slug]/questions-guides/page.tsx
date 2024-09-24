import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsCompanyGuidePage from '~/components/interviews/company/InterviewsCompanyGuidePage';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewsCompanyGuide } from '~/db/contentlayer/InterviewsCompanyGuideReader';
import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

// TODO(companies)
// export async function generateStaticParams() {
//   return [];
// }

type Props = Readonly<{
  params: {
    locale: string;
    slug: string;
  };
}>;

async function getPageSEOMetadata({ params }: Props) {
  const { locale, slug } = params;
  const [intl, companyGuide] = await Promise.all([
    getIntlServerOnly(locale),
    fetchInterviewsCompanyGuide(slug),
  ]);

  if (companyGuide == null) {
    return notFound();
  }

  return {
    description: intl.formatMessage(
      {
        defaultMessage:
          'The one-stop to prepare well for your {company} front end interviews. Discover insider tips, optimal prep strategies, and practice questions known to be tested.',
        description: 'Page description for company guides detail',
        id: 'rIMevx',
      },
      {
        company: companyGuide.name,
      },
    ),
    href: `/interviews/company/${slug}/questions-guides`,
    socialTitle: intl.formatMessage(
      {
        defaultMessage:
          '{company} Front End Interview Playbook | GreatFrontEnd',
        description: 'Social title for company guides detail',
        id: 'eGdxs5',
      },
      {
        company: companyGuide.name,
      },
    ),
    title: intl.formatMessage(
      {
        defaultMessage:
          '{company} Front End Interview Playbook - Prep Strategies and Practice Questions',
        description: 'Page title for company guides detail',
        id: 'A8Qo2Q',
      },
      {
        company: companyGuide.name,
      },
    ),
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
  const { locale, slug } = params;

  const companyGuide = await fetchInterviewsCompanyGuide(slug);

  if (companyGuide == null) {
    return notFound();
  }

  const companyQuestions = {
    algo: companyGuide.questionsAlgo ?? [],
    javascript: companyGuide.questionsJavaScript ?? [],
    quiz: companyGuide.questionsQuiz ?? [],
    'system-design': companyGuide.questionsSystemDesign ?? [],
    'user-interface': companyGuide.questionsUserInterface ?? [],
  };

  const [questions, bottomContent, seoMetadata] = await Promise.all([
    fetchQuestionsBySlug(companyQuestions, locale),
    fetchInterviewListingBottomContent('company-detail'),
    getPageSEOMetadata({ params }),
  ]);
  const codingQuestions = [
    ...questions.javascript,
    ...questions['user-interface'],
    ...questions.algo,
  ];
  const systemDesignQuestions = questions['system-design'];
  const quizQuestions = questions.quiz;

  return (
    <InterviewsCompanyGuidePage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      codingQuestions={codingQuestions}
      companyGuide={companyGuide}
      companyQuestions={companyQuestions}
      metadata={{
        ...seoMetadata,
        title: seoMetadata.socialTitle,
      }}
      quizQuestions={sortQuestions(
        quizQuestions as ReadonlyArray<QuestionMetadata>,
        'importance',
        false,
      )}
      systemDesignQuestions={systemDesignQuestions}
    />
  );
}
