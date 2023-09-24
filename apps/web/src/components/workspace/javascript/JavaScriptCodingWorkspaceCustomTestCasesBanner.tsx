import { FormattedMessage } from 'react-intl';
import { useLocalStorage } from 'usehooks-ts';

import Banner from '~/components/ui/Banner';

export default function JavaScriptCodingWorkspaceCustomTestCasesBanner() {
  const [showCustomTestCasesMessage, setShowCustomTestCasesMessage] =
    useLocalStorage('gfe:workspace:run_tests_banner', true);

  if (!showCustomTestCasesMessage) {
    return null;
  }

  return (
    <Banner
      size="xs"
      truncate={true}
      variant="primary"
      onHide={() => {
        setShowCustomTestCasesMessage(false);
      }}>
      <FormattedMessage
        defaultMessage="Run your code against this subset of test cases."
        description="Message to explain the custom tests cases"
        id="OERnmz"
      />
    </Banner>
  );
}
