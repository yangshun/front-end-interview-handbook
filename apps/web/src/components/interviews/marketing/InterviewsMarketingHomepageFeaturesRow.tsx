'use client';

import { RiBook3Line, RiTeamLine, RiTerminalBoxLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';

import type { Feature } from './InterviewsMarketingFeaturesRow';
import InterviewsMarketingFeaturesRow from './InterviewsMarketingFeaturesRow';
import { QuestionCount } from '../questions/listings/stats/QuestionCount';
import Container from '../../ui/Container';

function useFeatures(): ReadonlyArray<Feature> {
  const intl = useIntl();

  const features: ReadonlyArray<Feature> = [
    {
      description: intl.formatMessage(
        {
          defaultMessage:
            '{QuestionCount}+ of the most important questions — from building user interfaces in popular front end frameworks to system design.',
          description:
            "Description of 'Practice everything in popular frameworks' feature in marketing page",
          id: '1hBmJl',
        },
        {
          QuestionCount,
        },
      ),
      icon: RiTerminalBoxLine,
      key: 'practice-everything',
      name: intl.formatMessage({
        defaultMessage: 'Practice everything in popular frameworks',
        description:
          "Title of 'Practice everything in popular frameworks' feature in marketing page",
        id: 'fmAcHR',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Every question is accompanied by an official, well-explained solution from ex-interviewers.',
        description:
          "Description of 'Learn from official solutions and guides' feature in marketing page",
        id: 'Z4VfkU',
      }),
      icon: RiBook3Line,
      key: 'learn-from-official-solutions',
      name: intl.formatMessage({
        defaultMessage: 'Learn from official solutions and guides',
        description:
          "Title of 'Learn from official solutions and guides' feature in marketing page",
        id: 'p/R4cx',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Including core maintainers at popular open source projects and creators of Blind 75 and Front End Interview Handbook.',
        description:
          "Description of 'Guided by well-known senior engineers' feature in marketing page",
        id: 'ujRHIv',
      }),
      icon: RiTeamLine,
      key: 'guided-by-well-known-senior-engineers',
      name: intl.formatMessage({
        defaultMessage: 'Guided by well-known senior engineers',
        description:
          "Title of 'Guided by well-known senior engineers' feature in marketing page",
        id: 'W+ConA',
      }),
    },
  ];

  return features;
}

export default function InterviewsMarketingHomepageFeaturesRow() {
  const intl = useIntl();
  const features = useFeatures();

  return (
    <Container className="py-16">
      <InterviewsMarketingFeaturesRow
        features={features}
        title={intl.formatMessage({
          defaultMessage: 'Key features',
          description: 'Key features of the product',
          id: '97HVxk',
        })}
      />
    </Container>
  );
}
