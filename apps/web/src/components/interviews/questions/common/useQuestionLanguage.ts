import { useIntl } from '~/components/intl';

export default function useQuestionLanguage() {
  const intl = useIntl();

  return {
    css: intl.formatMessage({
      defaultMessage: 'CSS',
      description: 'Label for CSS language',
      id: 'zqNjnp',
    }),
    html: intl.formatMessage({
      defaultMessage: 'HTML',
      description: 'Label for HTML language',
      id: 'cZVPou',
    }),
    js: intl.formatMessage({
      defaultMessage: 'JavaScript',
      description: 'Label for JavaScript language',
      id: 'RTBOas',
    }),
  };
}
