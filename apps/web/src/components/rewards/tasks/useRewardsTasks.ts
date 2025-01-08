import {
  RiGithubFill,
  RiLinkedinFill,
  RiStarFill,
  RiTwitterXFill,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';

export function useRewardsTasks() {
  const intl = useIntl();
  const tasks = [
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
      actionName: 'GITHUB_STAR.JS_INTERVIEWS',
      icon: RiStarFill,
      label: intl.formatMessage({
        defaultMessage: 'Star our "JavaScript Interview Questions" repo',
        description: 'Title for task',
        id: '/aaSHm',
      }),
      taskHref:
        'https://github.com/yangshun/top-javascript-interview-questions',
    },
    {
      actionName: 'GITHUB_STAR.REACT_INTERVIEWS',
      icon: RiStarFill,
      label: intl.formatMessage({
        defaultMessage: 'Star our "React.js Interview Questions" repo',
        description: 'Title for task',
        id: 'tPzONL',
      }),
      taskHref: 'https://github.com/yangshun/top-reactjs-interview-questions',
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
        defaultMessage: 'Follow us on X / Twitter',
        description: 'Title for task',
        id: 'RL7b8v',
      }),
      taskHref: 'https://twitter.com/greatfrontend',
    },
  ] as const;

  return tasks;
}
