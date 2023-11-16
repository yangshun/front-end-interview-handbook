import { FormattedMessage } from 'react-intl';
import { useLocalStorage } from 'usehooks-ts';

import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';

export default function JavaScriptCodingWorkspaceCustomTestCasesBanner() {
  const { dispatch } = useJavaScriptCodingWorkspaceTilesContext();
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
        defaultMessage='This subset of test cases are used when "Run"-ning your code.'
        description="Message to explain the custom tests cases"
        id="b/dKUR"
      />{' '}
      <Anchor
        className="underline"
        href="#"
        variant="unstyled"
        onClick={(event) => {
          event.preventDefault();
          dispatch({
            payload: {
              tabId: 'submission_test_cases',
            },
            type: 'tab-set-active',
          });
        }}>
        View submission test cases.
      </Anchor>
    </Banner>
  );
}
