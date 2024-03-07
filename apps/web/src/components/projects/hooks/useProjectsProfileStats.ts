import {
  RiEyeFill,
  RiRocketFill,
  RiTerminalBoxFill,
  RiThumbUpFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

type Props = Readonly<{
  codeReviews?: number;
  completedChallenges?: number;
  submissionViews?: number;
  upvotes?: number;
}>;

export default function useProjectsProfileStats({
  completedChallenges,
  upvotes,
  codeReviews,
  submissionViews,
}: Props) {
  const intl = useIntl();
  const stats = [
    {
      count: completedChallenges ?? 0,
      icon: RiRocketFill,
      title: intl.formatMessage({
        defaultMessage: 'Projects completed',
        description: 'Number of project challenges completed',
        id: '5fiXoP',
      }),
    },
    {
      count: upvotes ?? 0,
      icon: RiThumbUpFill,
      title: intl.formatMessage({
        defaultMessage: 'Total upvotes',
        description: 'Number of upvotes received',
        id: 'bGVcNO',
      }),
    },
    {
      count: codeReviews ?? 0,
      icon: RiTerminalBoxFill,
      title: intl.formatMessage({
        defaultMessage: 'Code reviews',
        description: 'Number of code reviews given',
        id: 'HLxG4R',
      }),
    },
    {
      count: submissionViews ?? 0,
      icon: RiEyeFill,
      title: intl.formatMessage({
        defaultMessage: 'Views on your submissions',
        description: 'Number of views on the project submissions',
        id: 'KeMz9W',
      }),
    },
  ];

  return stats;
}
