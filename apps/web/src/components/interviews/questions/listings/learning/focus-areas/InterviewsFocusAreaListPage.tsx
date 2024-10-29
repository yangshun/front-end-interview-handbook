'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import {
  RiListCheck3,
  RiVerifiedBadgeLine,
  RiWindow2Line,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import InterviewsListPageHeader from '~/components/interviews/common/InterviewsListPageHeader';
import {
  categorizeFocusAreas,
  FocusAreaIcons,
} from '~/components/interviews/questions/content/study-list/FocusAreas';
import InterviewsStudyListCard from '~/components/interviews/questions/listings/learning/InterviewsStudyListCard';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  focusAreas: ReadonlyArray<InterviewsStudyList>;
}>;

export default function InterviewsRevampFocusAreaListPage({
  focusAreas,
  bottomContent,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

  const sessions = questionListSessions ?? [];
  const focusAreasCategories = categorizeFocusAreas(intl, focusAreas);

  const features = [
    {
      icon: RiListCheck3,
      label: intl.formatMessage(
        {
          defaultMessage: '{count} topical deep-dives',
          description: 'Features for focus areas',
          id: '2fVNQZ',
        },
        {
          count: Object.keys(focusAreas).length,
        },
      ),
    },
    {
      icon: RiWindow2Line,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for focus areas',
        id: 'iRkjCv',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions and tests',
        description: 'Features for focus areas',
        id: '1VQd95',
      }),
    },
  ];

  return (
    <Container className={clsx('flex flex-col', 'py-10', 'gap-y-12')}>
      <InterviewsListPageHeader
        description={intl.formatMessage({
          defaultMessage:
            'Deep-dive into topical focus areas critical for front end interviews.',
          description: 'Description for focus areas page',
          id: 'CPBDLd',
        })}
        features={features}
        title={intl.formatMessage({
          defaultMessage: 'Focus areas',
          description: 'Title of focus areas page',
          id: 'Zui1cu',
        })}>
        <div className="flex max-w-3xl flex-col gap-4">
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                'The vast breadth of topics that could come up during a front end interview can be daunting.',
              description: 'Long description for focus areas page',
              id: 'd/hzjd',
            })}
          </Text>
          <Text color="secondary" size="body1">
            {intl.formatMessage({
              defaultMessage:
                "To simplify your preparation, we've carefully organized the entire front end domain into 8 critical focus areas, each covering the most frequently tested topics in interviews.",
              description: 'Long description for focus areas page',
              id: 'aatVPw',
            })}
          </Text>
        </div>
      </InterviewsListPageHeader>
      <Section>
        <div className="flex flex-col gap-12">
          {focusAreasCategories.map(({ title, items }) => (
            <div key={title} className="flex flex-col gap-6">
              <Heading level="heading6">{title}</Heading>
              <div className="flex flex-col gap-4">
                {items.map((focusArea) => {
                  const session = sessions.find(
                    (session_) => session_.key === focusArea.slug,
                  );
                  const completionCount = session?._count.progress;

                  return (
                    <InterviewsStudyListCard
                      key={focusArea.slug}
                      completionCount={completionCount}
                      icon={FocusAreaIcons[focusArea.slug]}
                      isStarted={session != null}
                      studyList={focusArea}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>
      {bottomContent && (
        <>
          <Divider className="my-8" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </Container>
  );
}
