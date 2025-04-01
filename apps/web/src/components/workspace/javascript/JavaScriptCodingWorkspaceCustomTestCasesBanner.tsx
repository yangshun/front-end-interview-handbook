import { useLocalStorage } from 'usehooks-ts';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';
import { codingWorkspaceTabFileId } from '../common/tabs/codingWorkspaceTabId';

export default function JavaScriptCodingWorkspaceCustomTestCasesBanner() {
  const intl = useIntl();
  const { dispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const { workspace } = useJavaScriptCodingWorkspaceContext();
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
              fallbackNeighborTabId: codingWorkspaceTabFileId(workspace.main),
              openBesideTabId: codingWorkspaceTabFileId(workspace.run),
              tabId: 'submission_test_cases',
            },
            type: 'tab-set-active-otherwise-open',
          });
        }}>
        {intl.formatMessage({
          defaultMessage: 'View submission test cases.',
          description: 'Coding workspace view submission test cases link',
          id: '3HrE7g',
        })}
      </Anchor>
    </Banner>
  );
}
