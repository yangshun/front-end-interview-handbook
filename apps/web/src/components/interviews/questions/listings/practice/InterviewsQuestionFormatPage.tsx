'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import {
  RiTestTubeLine,
  RiVerifiedBadgeLine,
  RiWindow2Line,
} from 'react-icons/ri';

import { useQuestionFormatsData } from '~/data/QuestionLists';

import type {
  FrontEndInterviewSlugType,
  FrontEndSystemDesignSlugType,
  GuideCardMetadata,
} from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import InterviewsPageHeaderLogo from '~/components/interviews/common/InterviewsPageHeaderLogo';
import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

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
  const features = [
    {
      icon: RiWindow2Line,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for question format page',
        id: 'X/O+1P',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Solved by ex-interviewers',
        description: 'Features for question format page',
        id: 'gl9tj6',
      }),
    },
    {
      icon: RiTestTubeLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for question format page',
        id: 'nI4Alg',
      }),
    },
  ];

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
    guidesSlugs[format].includes(guide.slug as FrontEndInterviewSlugType),
  );

  const guidesWithCompletionStatus =
    useGuidesWithCompletionStatus(filteredGuides);

  const formatData = useQuestionFormatsData();
  const filterNamespace = `format:${format}`;

  return (
    <div className={clsx('flex flex-col', 'gap-y-8 md:gap-y-10 2xl:gap-y-12')}>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <InterviewsPageHeaderLogo icon={formatData[format].icon} />
            <Heading level="heading4">{title}</Heading>
          </div>
          <Text className="block" color="subtitle" size="body1" weight="medium">
            {description}
          </Text>
        </div>
        {/* Features */}
        <div className="mt-10">
          <InterviewsPageFeatures features={features} />
        </div>
        <Divider className="mt-8" />
      </div>
      <Section>
        <QuestionsUnifiedListWithFiltersAndProgress
          defaultSortField="difficulty"
          filterNamespace={filterNamespace}
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
          questionCompletionCount={questionCompletionCount}
          questions={questions}
          searchPlaceholder={formatData[format].searchPlaceholder}
        />
        {bottomContent && (
          <>
            <Divider className="my-8" />
            <MDXContent mdxCode={bottomContent.body.code} />
          </>
        )}
      </Section>
    </div>
  );
}
