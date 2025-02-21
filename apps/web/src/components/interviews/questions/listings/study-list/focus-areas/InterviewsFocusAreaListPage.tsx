'use client';

import clsx from 'clsx';
import type {
  InterviewsListingBottomContent,
  InterviewsStudyList,
} from 'contentlayer/generated';
import { RiListCheck3 } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import {
  categorizeFocusAreas,
  FocusAreaIcons,
} from '~/components/interviews/questions/content/study-list/StudyListUtils';
import InterviewsStudyListCard from '~/components/interviews/questions/listings/study-list/InterviewsStudyListCard';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import SponsorsAdPlacementSpotlightCard from '~/components/sponsors/ads/SponsorsAdPlacementSpotlightCard';
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
  const questionFeatures = useInterviewsQuestionsFeatures(
    Object.keys(focusAreas).length,
  );
  const { data: questionListSessions } =
    trpc.questionSessions.getActive.useQuery(undefined, {
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
    questionFeatures.codeInBrowser,
    questionFeatures.officialSolutionAndTest,
  ];

  return (
    <div className={clsx('flex flex-col', 'gap-y-10')}>
      <InterviewsPageHeader
        description={intl.formatMessage({
          defaultMessage:
            'Deep-dive into topical focus areas critical for front end interviews.',
          description: 'Description for focus areas page',
          id: 'CPBDLd',
        })}
        features={features}
        headingAddOnElement={<InterviewsPremiumBadge />}
        sideElement={<SponsorsAdPlacementSpotlightCard />}
        title={intl.formatMessage({
          defaultMessage: 'Focus areas',
          description: 'Title of focus areas page',
          id: 'Zui1cu',
        })}>
        <div
          className={clsx(
            'flex flex-col gap-4 lg:max-w-[75%]',
            'text-sm xl:text-base',
          )}>
          <Text color="secondary" size="inherit">
            {intl.formatMessage({
              defaultMessage:
                'The vast breadth of topics that could come up during a front end interview can be daunting.',
              description: 'Long description for focus areas page',
              id: 'd/hzjd',
            })}
          </Text>
          <Text color="secondary" size="inherit">
            {intl.formatMessage(
              {
                defaultMessage:
                  "To simplify your preparation, we've carefully organized the entire front end domain into {focusAreasCount} critical focus areas, each covering the most frequently tested topics in interviews.",
                description: 'Long description for focus areas page',
                id: 'SskhEH',
              },
              {
                focusAreasCount: focusAreas.length,
              },
            )}
          </Text>
        </div>
      </InterviewsPageHeader>
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
        {bottomContent && (
          <>
            <Divider className="my-10" />
            <MDXContent
              components={{
                FocusAreasCount: () => <span>{focusAreas.length}</span>,
              }}
              mdxCode={bottomContent.body.code}
            />
          </>
        )}
      </Section>
    </div>
  );
}
