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
        defaultMessage: 'Challenges completed',
        description: 'Number of project challenges completed',
        id: 'lWQA1A',
      }),
    },
    {
      count: upvotes ?? 0,
      icon: RiThumbUpFill,
      title: intl.formatMessage({
        defaultMessage: 'Upvotes received',
        description: 'Number of upvotes received',
        id: 'JinTBm',
      }),
    },
    {
      count: codeReviews ?? 0,
      icon: RiTerminalBoxFill,
      title: intl.formatMessage({
        defaultMessage: 'Code reviews done',
        description: 'Number of code reviews given',
        id: 'axma2q',
      }),
    },
    {
      count: submissionViews ?? 0,
      icon: RiEyeFill,
      title: intl.formatMessage({
        defaultMessage: 'Views on submissions',
        description: 'Number of views on the project submissions',
        id: 'oC86Nx',
      }),
    },
  ];

  return stats;
}
