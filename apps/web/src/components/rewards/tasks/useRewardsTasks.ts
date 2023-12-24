import {
  RiGithubFill,
  RiLinkedinFill,
  RiStarLine,
  RiTwitterXFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

export function useRewardsTasks() {
  const intl = useIntl();
  const tasks = [
    {
      actionName: 'GITHUB_STAR',
      icon: RiStarLine,
      label: intl.formatMessage({
        defaultMessage: 'Star our GitHub repo',
        description: 'Title for task',
        id: 'Ne4i1M',
      }),
      taskHref:
        'https://github.com/greatfrontend/awesome-front-end-system-design',
    },
    {
      actionName: 'GITHUB_FOLLOW',
      icon: RiGithubFill,
      label: intl.formatMessage({
        defaultMessage: 'Follow us on GitHub',
        description: 'Title for task',
        id: 'oS10TF',
      }),
      taskHref: 'https://github.com/greatfrontend',
    },
    {
      actionName: 'LINKEDIN_FOLLOW',
      icon: RiLinkedinFill,
      label: intl.formatMessage({
        defaultMessage: 'Follow us on LinkedIn',
        description: 'Title for task',
        id: 'vg2xht',
      }),
      taskHref: 'https://linkedin.com/company/greatfrontend',
    },
    {
      actionName: 'TWITTER_FOLLOW',
      icon: RiTwitterXFill,
      label: intl.formatMessage({
        defaultMessage: 'Follow us on Twitter',
        description: 'Title for task',
        id: 'P6iF2f',
      }),
      taskHref: 'https://twitter.com/greatfrontend',
    },
  ] as const;

  return tasks;
}
