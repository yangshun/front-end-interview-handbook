import { useIntl } from 'react-intl';
import { useSessionStorage } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';

const hideStartSessionStorageKey = 'gfe:hideStartSessionDialog';

// For storing the learning list key where we should hide
// the start session prompt on question click once user dismissed it
export function useHideStartSessionDialogStorage(listKey: string) {
  const [storagePayload, setStoragePayload] = useSessionStorage<Array<string>>(
    hideStartSessionStorageKey,
    [],
  );

  function add() {
    if (!storagePayload.includes(listKey)) {
      setStoragePayload([...storagePayload, listKey]);
    }
  }

  function remove() {
    if (storagePayload.includes(listKey)) {
      setStoragePayload(storagePayload.filter((item) => item !== listKey));
    }
  }

  function isHidden(): boolean {
    return storagePayload.includes(listKey);
  }

  return { add, isHidden, remove };
}

export function useStartLearningSessionMutation(listKey: string) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();
  const { remove: removeHideStartSessionPrompt } =
    useHideStartSessionDialogStorage(listKey);

  return trpc.questionLists.startSession.useMutation({
    onSuccess() {
      trpcUtils.questionLists.invalidate();
      removeHideStartSessionPrompt();
      showToast({
        title: intl.formatMessage({
          defaultMessage: "We've started tracking your progress",
          description: 'Success message for starting a study plan',
          id: 'HJ+bJn',
        }),
        variant: 'success',
      });
    },
  });
}
