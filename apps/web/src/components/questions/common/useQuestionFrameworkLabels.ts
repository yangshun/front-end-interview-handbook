import { useIntl } from 'react-intl';

export default function useQuestionFrameworkLabels() {
  // Now that it's in a React hook, you can use intl.formatMessage
  const intl = useIntl();

  return {
    react: intl.formatMessage({
      defaultMessage: 'React',
      description: 'Label for React framework',
      id: 's51Pgd',
    }),
    vanilla: intl.formatMessage({
      defaultMessage: 'Vanilla JS',
      description: 'Label for Vanilla JavaScript framework',
      id: 'JLf/Lc',
    }),
  };
}
