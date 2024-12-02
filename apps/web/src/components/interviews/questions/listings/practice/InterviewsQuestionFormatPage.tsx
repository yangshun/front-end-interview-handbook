'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import { useQuestionFormatsData } from '~/data/QuestionCategories';

import type {
  FrontEndInterviewSlugType,
  FrontEndSystemDesignSlugType,
  GuideCardMetadata,
} from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsByAccess } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import QuestionListingAccessSummary from '~/components/interviews/questions/listings/stats/QuestionListingAccessSummary';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import useInterviewsQuestionFormatFeatures from './useInterviewsQuestionFormatFeatures';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  description: string;
  format: QuestionFormat;
  guides: ReadonlyArray<GuideCardMetadata>;
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadata>;
  title: string;
}>;

export default function InterviewsQuestionFormatPage({
  title,
  description,
  format,
  questions,
  questionCompletionCount,
  bottomContent,
  guides,
}: Props) {
  const intl = useIntl();
  const features = useInterviewsQuestionFormatFeatures(questions.length);

  const guidesSlugs: Record<
    QuestionFormat,
    ReadonlyArray<FrontEndInterviewSlugType | FrontEndSystemDesignSlugType>
  > = {
    algo: ['algorithms'],
    javascript: ['javascript'],
    quiz: ['quiz'],
    'system-design': [
      'introduction',
      'types-of-questions',
      'framework',
      'evaluation-axes',
      'cheatsheet',
    ],
    'user-interface': [
      'user-interface',
      'user-interface-questions-cheatsheet',
      'user-interface-components-api-design-principles',
    ],
  };
  const guideCardTitle: Record<QuestionFormat, string> = {
    algo: intl.formatMessage({
      defaultMessage: 'Algorithmic Coding Interview Guides',
      description: 'Title for guide card',
      id: 'nYa2H9',
    }),
    javascript: intl.formatMessage({
      defaultMessage: 'JavaScript Interview Guides',
      description: 'Title for guide card',
      id: '0ljSJ7',
    }),
    quiz: intl.formatMessage({
      defaultMessage: 'Quiz Interview Guides',
      description: 'Title for guide card',
      id: 'cblnDH',
    }),
    'system-design': intl.formatMessage({
      defaultMessage: 'Front End System Design Interview Guides',
      description: 'Title for guide card',
      id: 'kpj0yo',
    }),
    'user-interface': intl.formatMessage({
      defaultMessage: 'User Interface Coding Guides',
      description: 'Title for guide card',
      id: 'DmiRUe',
    }),
  };

  const filteredGuides = guides.filter((guide) =>
    guidesSlugs[format].includes(guide.id as FrontEndInterviewSlugType),
  );

  const guidesWithCompletionStatus =
    useGuidesWithCompletionStatus(filteredGuides);

  const formatData = useQuestionFormatsData();
  const questionsAccessCount = countQuestionsByAccess(questions);

  return (
    <div className={clsx('flex flex-col', 'gap-y-10')}>
      <InterviewsPageHeader
        description={description}
        features={features[format]}
        icon={formatData[format].icon}
        title={title}
      />
      <Section>
        <QuestionsUnifiedListWithFiltersAndProgress
          guides={
            guidesWithCompletionStatus.length > 0
              ? {
                  description: intl.formatMessage({
                    defaultMessage:
                      'Gain an insider overview of essential tips to prepare effectively before you begin practicing.',
                    description: 'Description for guide card',
                    id: 'v1a7l5',
                  }),
                  items: guidesWithCompletionStatus,
                  title: guideCardTitle[format],
                }
              : undefined
          }
          listType={{ type: 'format', value: format }}
          questionCompletionCount={questionCompletionCount}
          questions={questions}
          searchPlaceholder={formatData[format].searchPlaceholder}
          sideColumnAddOn={
            <div className="hidden flex-col gap-8 lg:flex">
              <QuestionListingAccessSummary {...questionsAccessCount} />
            </div>
          }
        />
        {bottomContent && (
          <>
            <Divider className="my-10" />
            <MDXContent mdxCode={bottomContent.body.code} />
          </>
        )}
      </Section>
    </div>
  );
}
