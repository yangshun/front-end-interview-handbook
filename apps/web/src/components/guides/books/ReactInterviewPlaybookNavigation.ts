import {
  RiApps2AddLine,
  RiCursorLine,
  RiFlowChart,
  RiGlobalLine,
  RiInputField,
  RiLandscapeLine,
  RiLightbulbLine,
  RiMegaphoneLine,
  RiReactjsFill,
  RiRecycleLine,
  RiUserLine,
  RiWebhookLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';

import type { GuideNavigation } from '../types';

export const basePath = '/react-interview-playbook';

export const ReactInterviewPlaybookPaths = [
  'introduction',
  'react-data-fetching',
  'react-basic-concepts',
  'react-design-patterns',
  'react-event-handling',
  'react-forms',
  'react-interview-preparation',
  'react-hooks',
  'react-landscape-history',
  'react-signup-form-example',
  'react-state-design',
  'react-thinking-declaratively',
] as const;

export type ReactInterviewPlaybookPathType =
  (typeof ReactInterviewPlaybookPaths)[number];

export const ReactInterviewPlaybookPathToFile: Record<
  ReactInterviewPlaybookPathType,
  string
> = {
  introduction: 'introduction',
  'react-basic-concepts': 'react-basic-concepts',
  'react-data-fetching': 'react-data-fetching',
  'react-design-patterns': 'react-design-patterns',
  'react-event-handling': 'react-event-handling',
  'react-forms': 'react-forms',
  'react-hooks': 'react-hooks',
  'react-interview-preparation': 'react-interview-preparation',
  'react-landscape-history': 'react-landscape-history',
  'react-signup-form-example': 'react-signup-form-example',
  'react-state-design': 'react-state-design',
  'react-thinking-declaratively': 'react-thinking-declaratively',
};

export function useReactInterviewPlaybookNavigation() {
  const intl = useIntl();
  const navigation: GuideNavigation = {
    initialOpenSections: ['overview', 'topics'],
    navigation: {
      items: [
        {
          id: 'overview',
          items: [
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/introduction`,
              icon: RiReactjsFill,
              id: 'introduction',
              label: intl.formatMessage({
                defaultMessage: 'Intro to React interviews',
                description: 'Introduction to react interviews',
                id: 'dJsXKj',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-landscape-history`,
              icon: RiLandscapeLine,
              id: 'landscape-history',
              label: intl.formatMessage({
                defaultMessage: 'Landscape and history',
                description: 'React landscape and history',
                id: 'XzhySv',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-interview-preparation`,
              icon: RiApps2AddLine,
              id: 'fundamentals',
              label: intl.formatMessage({
                defaultMessage: 'How to prepare',
                description: 'How to prepare for React interviews',
                id: 'QiGjFK',
              }),
              type: 'link',
            },
          ],
          label: intl.formatMessage({
            defaultMessage: 'Overview',
            description: 'Overview of react interview',
            id: 'zl0c0t',
          }),
          type: 'list',
        },
        {
          id: 'topics',
          items: [
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-basic-concepts`,
              icon: RiLightbulbLine,
              id: 'concepts',
              label: intl.formatMessage({
                defaultMessage: 'Basic concepts',
                description: 'React concepts',
                id: 'JuzehK',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-thinking-declaratively`,
              icon: RiMegaphoneLine,
              id: 'hooks',
              label: intl.formatMessage({
                defaultMessage: 'Thinking declaratively',
                description: 'Thinking declaratively in React',
                id: 'yg17Hv',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-state-design`,
              icon: RiFlowChart,
              id: 'hooks',
              label: intl.formatMessage({
                defaultMessage: 'State design',
                description: 'State design in React',
                id: 'ggLl5X',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-hooks`,
              icon: RiWebhookLine,
              id: 'hooks',
              label: intl.formatMessage({
                defaultMessage: 'React hooks',
                description: 'React hooks',
                id: 'H5rbVW',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-event-handling`,
              icon: RiCursorLine,
              id: 'event-handling',
              label: intl.formatMessage({
                defaultMessage: 'Event handling',
                description: 'React event handling',
                id: 'DyvzNM',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-forms`,
              icon: RiInputField,
              id: 'forms',
              label: intl.formatMessage({
                defaultMessage: 'Forms',
                description: 'React forms',
                id: 'e7JLna',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-signup-form-example`,
              icon: RiUserLine,
              id: 'forms',
              label: intl.formatMessage({
                defaultMessage: 'Signup form example',
                description: 'React signup form example',
                id: 'XjgIMA',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-data-fetching`,
              icon: RiGlobalLine,
              id: 'data-fetching',
              label: intl.formatMessage({
                defaultMessage: 'Data fetching',
                description: 'React data fetching',
                id: 'zVrFhs',
              }),
              type: 'link',
            },
            {
              description: intl.formatMessage({
                defaultMessage: 'TODO',
                description: 'TODO',
                id: 'YTXJnS',
              }),
              href: `${basePath}/react-design-patterns`,
              icon: RiRecycleLine,
              id: 'design-patterns',
              label: intl.formatMessage({
                defaultMessage: 'Design patterns',
                description: 'React design patterns',
                id: 'GkiGfX',
              }),
              type: 'link',
            },
          ],
          label: intl.formatMessage({
            defaultMessage: 'Essential topics',
            description: 'React essential topics',
            id: 'CZl1aD',
          }),
          type: 'list',
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'React Interview Playbook',
        description: 'Title for react interview playbook',
        id: 'bKQrOw',
      }),
    },
  };

  return navigation;
}
