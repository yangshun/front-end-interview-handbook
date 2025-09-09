import { useLocalStorage } from 'usehooks-ts';

import { FormattedMessage } from '~/components/intl';
import Banner from '~/components/ui/Banner';

export default function JavaScriptCodingWorkspaceCustomTestCasesBanner() {
  const [showCustomTestCasesMessage, setShowCustomTestCasesMessage] =
    useLocalStorage('gfe:workspace:run_tests_banner', true);

  if (!showCustomTestCasesMessage) {
    return null;
  }

  return (
    <Banner
      className="p-1 dark:bg-neutral-950 dark:text-neutral-100"
      size="xs"
      truncate={true}
      variant="custom"
      onHide={() => {
        setShowCustomTestCasesMessage(false);
      }}>
      <FormattedMessage
        defaultMessage='This set of customizable test cases run when you "Run" your code.'
        description="Message to explain the custom tests cases"
        id="jdfqZM"
      />{' '}
    </Banner>
  );
}
