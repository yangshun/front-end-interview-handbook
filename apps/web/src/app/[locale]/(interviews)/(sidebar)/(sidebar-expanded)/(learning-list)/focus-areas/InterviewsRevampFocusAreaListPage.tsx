'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import {
  RiListCheck3,
  RiVerifiedBadgeLine,
  RiWindow2Line,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { FocusAreas } from '~/data/focus-areas/FocusAreas';

import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import InterviewsFocusAreasCard from '~/components/interviews/questions/listings/learning/focus-areas/InterviewsFocusAreaCard';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  focusAreas: FocusAreas;
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
  const focusAreasCategories = [
    {
      items: [
        focusAreas['javascript-polyfills'],
        focusAreas['async-operations'],
        focusAreas.lodash,
      ],
      title: intl.formatMessage({
        defaultMessage: 'JavaScript Engineering',
        description: 'Title for focus area type',
        id: 'er249T',
      }),
    },
    {
      items: [
        focusAreas['dom-manipulation'],
        focusAreas.forms,
        focusAreas['design-system-components'],
      ],
      title: intl.formatMessage({
        defaultMessage: 'User Interface Development',
        description: 'Title for focus area type',
        id: '2M6LN4',
      }),
    },
    {
      items: [focusAreas.accessibility, focusAreas['state-management']],
      title: intl.formatMessage({
        defaultMessage: 'Accessibility and Performance',
        description: 'Title for focus area type',
        id: '9yHSXW',
      }),
    },
    {
      items: [focusAreas['data-structures-algorithms']],
      title: intl.formatMessage({
        defaultMessage: 'Computer Science Foundations',
        description: 'Title for focus area type',
        id: 'L7w0Ka',
      }),
    },
  ];

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
      <div>
        <div className="flex flex-col gap-4">
          <Heading level="heading4">
            {intl.formatMessage({
              defaultMessage: 'Focus areas',
              description: 'Title of focus areas page',
              id: 'Zui1cu',
            })}
          </Heading>
          <Text className="block" color="subtitle" size="body1" weight="medium">
            {intl.formatMessage({
              defaultMessage:
                'Deep-dive into topical focus areas critical for front end interviews.',
              description: 'Description for focus areas page',
              id: 'CPBDLd',
            })}
          </Text>
        </div>
        {/* Features */}
        <div className="mt-10">
          <InterviewsPageFeatures features={features} />
        </div>

        <Divider className="my-8" />

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
      </div>
      <Section>
        <div className="flex flex-col gap-12">
          {focusAreasCategories.map(({ title, items }) => (
            <div key={title} className="flex flex-col gap-6">
              <Heading level="heading6">{title}</Heading>
              <div className="flex flex-col gap-4">
                {items.map((area) => {
                  const session = sessions.find(
                    (session_) => session_.key === area.type,
                  );
                  const completionCount = session?._count.progress;

                  return (
                    <InterviewsFocusAreasCard
                      key={area.type}
                      area={area}
                      completionCount={completionCount}
                      isStarted={session != null}
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
