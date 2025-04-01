import {
  RiGithubFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXFill,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';

export function useRewardsTasks() {
  const intl = useIntl();
  const tasks = [
    // {
    //   actionName: 'GITHUB_FOLLOW',
    //   icon: RiGithubFill,
    //   label: intl.formatMessage({
    //     defaultMessage: 'Follow us on GitHub',
    //     description: 'Title for task',
    //     id: 'oS10TF',
    //   }),
    //   taskHref: 'https://github.com/greatfrontend',
    // },
    {
      actionName: 'GITHUB_STAR.JS_INTERVIEWS',
      icon: RiGithubFill,
      label: intl.formatMessage({
        defaultMessage: 'Star our "JavaScript Interview Questions" repo',
        description: 'Star the GitHub repository',
        id: 'eKCjGR',
      }),
      taskHref:
        'https://github.com/yangshun/top-javascript-interview-questions',
    },
    {
      actionName: 'GITHUB_STAR.REACT_INTERVIEWS',
      icon: RiGithubFill,
      label: intl.formatMessage({
        defaultMessage: 'Star our "React.js Interview Questions" repo',
        description: 'Star the GitHub repository',
        id: '/IBuox',
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
      taskHref: 'https://www.linkedin.com/company/greatfrontend',
    },
    {
      actionName: 'TWITTER_FOLLOW',
      icon: RiTwitterXFill,
      label: intl.formatMessage({
        defaultMessage: 'Follow us on X / Twitter',
        description: 'Title for task',
        id: 'RL7b8v',
      }),
      taskHref: 'https://x.com/greatfrontend',
    },
    {
      actionName: 'INSTAGRAM_FOLLOW',
      icon: RiInstagramLine,
      label: intl.formatMessage({
        defaultMessage: 'Follow us on Instagram',
        description: 'Title for task',
        id: 'GlZhmJ',
      }),
      taskHref: 'https://www.instagram.com/greatfrontend',
    },
  ] as const;

  return tasks;
}
