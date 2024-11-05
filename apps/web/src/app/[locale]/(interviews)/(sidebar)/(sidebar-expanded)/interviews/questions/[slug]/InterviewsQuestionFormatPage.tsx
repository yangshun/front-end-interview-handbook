'use client';

import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import {
  RiArrowLeftLine,
  RiTestTubeLine,
  RiVerifiedBadgeLine,
  RiWindow2Line,
} from 'react-icons/ri';

import type {
  FrontEndInterviewSlugType,
  GuideCardMetadata,
} from '~/components/guides/types';
import useGuidesWithCompletionStatus from '~/components/guides/useGuidesWithCompletionStatus';
import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Button from '~/components/ui/Button';
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

  const slugs: ReadonlyArray<FrontEndInterviewSlugType> =
    format === 'javascript'
      ? [
          'javascript',
          'algorithms',
          'user-interface',
          'user-interface-questions-cheatsheet',
          'user-interface-components-api-design-principles',
        ]
      : ['algorithms'];

  const filteredGuides = guides.filter((guide) =>
    slugs.includes(guide.slug as FrontEndInterviewSlugType),
  );

  const guidesWithCompletionStatus =
    useGuidesWithCompletionStatus(filteredGuides);

  const guidesData = {
    description:
      format === 'javascript'
        ? intl.formatMessage({
            defaultMessage:
              'Explore our starter guides to get a solid grasp of Javascript interview prep before jumping into practice.',
            description: 'Description for guide card',
            id: 'Mx+po8',
          })
        : intl.formatMessage({
            defaultMessage:
              'Explore our starter guides to get a solid grasp of Algorithms interview prep before jumping into practice.',
            description: 'Description for guide card',
            id: '7Qdtf9',
          }),
    items: guidesWithCompletionStatus,
    title:
      format === 'javascript'
        ? intl.formatMessage({
            defaultMessage: 'Javascript Interview Guides',
            description: 'Title for guide card',
            id: 'Kxs/q8',
          })
        : intl.formatMessage({
            defaultMessage: 'Algorithms Interview Guides',
            description: 'Title for guide card',
            id: 'y4Aai3',
          }),
  };

  const filterNamespace = `format:${format}`;

  return (
    <>
      <div>
        <div className="mb-8 flex items-center justify-between gap-2">
          <Button
            addonPosition="start"
            className="-mb-2 -ml-5"
            href="/interviews/questions"
            icon={RiArrowLeftLine}
            label={intl.formatMessage({
              defaultMessage: 'Back to All practice questions',
              description:
                'Link text to navigate to all practice questions page',
              id: '1hQIJA',
            })}
            size="md"
            variant="tertiary"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Heading level="heading4">{title}</Heading>
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
          filterNamespace={filterNamespace}
          guides={
            guidesWithCompletionStatus.length > 0 ? guidesData : undefined
          }
          questionCompletionCount={questionCompletionCount}
          questions={questions}
          showSummarySection={false}
        />
      </Section>
      {bottomContent && (
        <>
          <Divider className="my-8" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </>
  );
}
