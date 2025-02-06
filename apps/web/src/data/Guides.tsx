import {
  RiBookOpenLine,
  RiFlowChart,
  RiQuestionAnswerLine,
} from 'react-icons/ri';

import { basePath as behavioralInterviewPlaybookBasePath } from '~/components/guides/books/BehavioralInterviewPlaybookNavigation';
import { basePath as frontEndInterviewPlaybookBasePath } from '~/components/guides/books/FrontEndInterviewPlaybookNavigation';
import { basePath as frontEndSystemDesignPlaybookBasePath } from '~/components/guides/books/FrontEndSystemDesignPlaybookNavigation';
import { useIntl } from '~/components/intl';

import type { GuidebookItem } from '@prisma/client';

type GuideData = Readonly<{
  description: string;
  firstPageHref: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: GuidebookItem;
  name: string;
  shortName: string;
}>;

export function useGuidesData() {
  const intl = useIntl();

  const items: Record<GuidebookItem, GuideData> = {
    BEHAVIORAL_INTERVIEW_PLAYBOOK: {
      description: intl.formatMessage({
        defaultMessage:
          'The only behavioral interview guide written specifically for front end engineers.',
        description: 'Guidebook description',
        id: 'IsJxd7',
      }),
      firstPageHref: `${behavioralInterviewPlaybookBasePath}/introduction`,
      href: behavioralInterviewPlaybookBasePath,
      icon: RiQuestionAnswerLine,
      key: 'BEHAVIORAL_INTERVIEW_PLAYBOOK',
      name: intl.formatMessage({
        defaultMessage: 'Behavioral Interview Playbook',
        description: 'Title for behavioral interview guide',
        id: 'eWWazl',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Behavioral Interview',
        description: 'Short title for behavioral interview playbook',
        id: 'xBNYLl',
      }),
    },
    FRONT_END_INTERVIEW_PLAYBOOK: {
      description: intl.formatMessage({
        defaultMessage:
          'The definitive guide to preparing for Front End Interviews, written by the author of Front End Interview Handbook.',
        description: 'Guidebook description',
        id: 'sYlXT3',
      }),
      firstPageHref: `${frontEndInterviewPlaybookBasePath}/introduction`,
      href: frontEndInterviewPlaybookBasePath,
      icon: RiBookOpenLine,
      key: 'FRONT_END_INTERVIEW_PLAYBOOK',
      name: intl.formatMessage({
        defaultMessage: 'Front End Interview Playbook',
        description: 'Front End Interview guide title',
        id: 'PqBXo4',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Front End Interview',
        description: 'Short title for Front End Interview Playbook',
        id: '5DLanP',
      }),
    },
    FRONT_END_SYSTEM_DESIGN_PLAYBOOK: {
      description: intl.formatMessage({
        defaultMessage:
          'The most comprehensive guide to Front End System Design Interviews you can find.',
        description: 'Front end system design guidebook description',
        id: 'jm+fR2',
      }),
      firstPageHref: `${frontEndSystemDesignPlaybookBasePath}/introduction`,
      href: frontEndSystemDesignPlaybookBasePath,
      icon: RiFlowChart,
      key: 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK',
      name: intl.formatMessage({
        defaultMessage: 'Front End System Design Playbook',
        description: 'Front end system design guidebook title',
        id: 'FyfO1X',
      }),
      shortName: intl.formatMessage({
        defaultMessage: 'Front End System Design',
        description: 'Short title of front end system design playbook',
        id: 'owQqZY',
      }),
    },
  };

  return items;
}
