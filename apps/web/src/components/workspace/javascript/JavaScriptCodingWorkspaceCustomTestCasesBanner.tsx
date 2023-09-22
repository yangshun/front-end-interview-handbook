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
      variant="primary"
      onHide={() => {
        setShowCustomTestCasesMessage(false);
      }}>
      <FormattedMessage
        defaultMessage="These are custom test cases you can run your code against."
        description="Message that appears under the coding workspace when user has previously worked on this problem and we restored their code"
        id="IPeBvB"
      />
    </Banner>
  );
}
