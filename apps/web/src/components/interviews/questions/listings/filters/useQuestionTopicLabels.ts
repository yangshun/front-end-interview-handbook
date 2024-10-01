import { BiUniversalAccess } from 'react-icons/bi';
import {
  RiCss3Fill,
  RiDashboard2Line,
  RiHtml5Fill,
  RiJavascriptFill,
  RiLock2Line,
  RiTestTubeLine,
  RiTranslate2,
  RiWifiLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';

import type { QuestionTopic } from '../../common/QuestionsTypes';

export default function useQuestionTopicLabels() {
  const intl = useIntl();

  const topicTitles: Record<
    QuestionTopic,
    Readonly<{
      icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
      label: string;
    }>
  > = {
    a11y: {
      icon: BiUniversalAccess,
      label: intl.formatMessage({
        defaultMessage: 'Accessibility',
        description: 'Accessibility topic for quiz questions',
        id: 'q0+3Lk',
      }),
    },
    css: {
      icon: RiCss3Fill,
      label: intl.formatMessage({
        defaultMessage: 'CSS',
        description: 'CSS topic for quiz questions',
        id: 'P4Or/u',
      }),
    },
    html: {
      icon: RiHtml5Fill,
      label: intl.formatMessage({
        defaultMessage: 'HTML',
        description: 'HTML topic for quiz questions',
        id: 'Yb2e9Q',
      }),
    },
    i18n: {
      icon: RiTranslate2,
      label: intl.formatMessage({
        defaultMessage: 'Internationalization',
        description: 'Internationalization topic for quiz questions',
        id: 'tonRki',
      }),
    },
    javascript: {
      icon: RiJavascriptFill,
      label: intl.formatMessage({
        defaultMessage: 'JavaScript',
        description: 'JavaScript topic for quiz questions',
        id: 'w22UH7',
      }),
    },
    network: {
      icon: RiWifiLine,
      label: intl.formatMessage({
        defaultMessage: 'Network',
        description: 'Network topic for quiz questions',
        id: 'pM/ZPq',
      }),
    },
    performance: {
      icon: RiDashboard2Line,
      label: intl.formatMessage({
        defaultMessage: 'Performance',
        description: 'Performance topic for quiz questions',
        id: 'kwblYW',
      }),
    },
    security: {
      icon: RiLock2Line,
      label: intl.formatMessage({
        defaultMessage: 'Security',
        description: 'Security topic for quiz questions',
        id: 'kvLlxS',
      }),
    },
    testing: {
      icon: RiTestTubeLine,
      label: intl.formatMessage({
        defaultMessage: 'Testing',
        description: 'Testing topic for quiz questions',
        id: 'l9OWsu',
      }),
    },
  };

  return topicTitles;
}
