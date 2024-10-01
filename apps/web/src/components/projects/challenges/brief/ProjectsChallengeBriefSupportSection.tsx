import React from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsChallengeBriefGuidesResourcesSupportCard from '~/components/projects/challenges/brief/support/ProjectsChallengeBriefGuidesResourcesSupportCard';
import ProjectsChallengeBriefQuestionSupportCard from '~/components/projects/challenges/brief/support/ProjectsChallengeBriefQuestionSupportCard';
import ProjectsChallengeBriefSubmissionSupportCard from '~/components/projects/challenges/brief/support/ProjectsChallengeBriefSubmissionSupportCard';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

type SupportItem = Readonly<{
  card: React.ReactNode;
  description: string;
  key: string;
  title: string;
}>;

function useSupportItems() {
  const intl = useIntl();

  const supportItems: Array<SupportItem> = [
    {
      card: <ProjectsChallengeBriefGuidesResourcesSupportCard />,
      description: intl.formatMessage({
        defaultMessage:
          'Development guides written & curated by Sr engineers at Big tech, such as:',
        description:
          'Description for "Official guides & resources" item in Expected Support section on Projects project page',
        id: 'abJ+kd',
      }),
      key: 'official-guides',
      title: intl.formatMessage({
        defaultMessage: 'Official guides & resources',
        description:
          'Label for "Official guides & resources" item in Expected Support section on Projects project page',
        id: 'uKEj2Z',
      }),
    },
    {
      card: <ProjectsChallengeBriefSubmissionSupportCard />,
      description: intl.formatMessage({
        defaultMessage:
          'We recommend well-rated submissions using the same stack for your reference',
        description:
          'Description for "Learn from good code" item in Expected Support section on Projects project page',
        id: 'CCiMOz',
      }),
      key: 'learn-from-good-code',
      title: intl.formatMessage({
        defaultMessage: 'Learn from good code',
        description:
          'Label for "Learn from good code" item in Expected Support section on Projects project page',
        id: 'jz6W//',
      }),
    },
    {
      card: <ProjectsChallengeBriefQuestionSupportCard />,
      description: intl.formatMessage({
        defaultMessage:
          'Have any doubts or need help? Ask in the community and discuss with others.',
        description:
          'Description for "Ask any questions in community" item in Expected Support section on Projects project page',
        id: 'Lwa7+3',
      }),
      key: 'ask-any-questions-in-community',
      title: intl.formatMessage({
        defaultMessage: 'Ask any questions in community',
        description:
          'Label for "Ask any questions in community" item in Expected Support section on Projects project page',
        id: 'rH3Vfz',
      }),
    },
  ];

  return supportItems;
}

export default function ProjectsChallengeBriefSupportSection() {
  const supportItems = useSupportItems();

  return (
    <div className="flex flex-col gap-8">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Support you can expect"
          description="Title for Expected Support section on Projects project page"
          id="+y/iOY"
        />
      </Heading>
      <Section>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {supportItems.map(
            ({ key, title: itemTitle, description: itemDescription, card }) => (
              <div key={key} className="flex flex-col gap-3">
                <Text
                  className="truncate whitespace-nowrap"
                  size="body1"
                  weight="bold">
                  {itemTitle}
                </Text>
                <div className="flex flex-col-reverse gap-y-4 lg:flex-col lg:gap-y-6">
                  <Text color="secondary" size="body2">
                    {itemDescription}
                  </Text>
                  {card}
                </div>
              </div>
            ),
          )}
        </div>
      </Section>
    </div>
  );
}
