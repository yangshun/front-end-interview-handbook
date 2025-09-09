import { useUser } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import type { CodingWorkspaceTabFileType } from '~/components/workspace/common/tabs/codingWorkspaceTabId';
import TestsSection from '~/components/workspace/common/tests/TestsSection';
import useJavaScriptCodingWorkspaceTilesContext from '~/components/workspace/javascript/hooks/useJavaScriptCodingWorkspaceTilesContext';
import {
  useJavaScriptCodingWorkspaceDispatch,
  useJavaScriptCodingWorkspaceSelector,
} from '~/components/workspace/javascript/store/hooks';
import { focusOnTest } from '~/components/workspace/javascript/store/javascript-workspace-slice';

import {
  useMutationQuestionProgressAdd,
  useQueryQuestionProgress,
} from '~/db/QuestionsProgressClient';
import { staticUpperCase } from '~/utils/typescript/stringTransform';

export default function JavaScriptCodingWorkspaceTestsSubmitTab({
  metadata,
  openBesideTabId,
  specPath,
  studyListKey,
}: Readonly<{
  metadata: QuestionMetadata;
  openBesideTabId: CodingWorkspaceTabFileType;
  specPath: string;
  studyListKey?: string;
}>) {
  const trpcUtils = trpc.useUtils();

  const intl = useIntl();
  const { tilesDispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const dispatch = useJavaScriptCodingWorkspaceDispatch();
  const executionStatus = useJavaScriptCodingWorkspaceSelector(
    (state) => state.execution.status,
  );
  const { language, question } = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace,
  );
  const files = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );
  const { workspace } = question;

  const mainFileCode = files[workspace.main].code;
  const markCompleteMutation = useMutationQuestionProgressAdd();
  const javaScriptAddSubmissionMutation =
    trpc.questionSubmission.javaScriptAdd.useMutation({
      onSuccess: () => {
        trpcUtils.questionSubmission.javaScriptGet.invalidate();
        trpcUtils.questionSubmission.javaScriptGetAll.invalidate();
      },
    });

  const user = useUser();
  const { data } = useQueryQuestionProgress(metadata, studyListKey ?? null);
  const { showToast } = useToast();

  useEffect(() => {
    if (executionStatus === 'submitting') {
      tilesDispatch({
        payload: {
          tabId: 'submit',
        },
        type: 'tab-set-active',
      });
    }
  }, [tilesDispatch, executionStatus]);

  return (
    <TestsSection
      metadata={metadata}
      specMode="submit"
      specPath={specPath}
      onComplete={(outcome) => {
        function saveSubmission(outcome_: 'correct' | 'wrong') {
          if (user == null) {
            return;
          }

          javaScriptAddSubmissionMutation.mutate({
            code: mainFileCode,
            language: staticUpperCase(language),
            result: staticUpperCase(outcome_),
            slug: metadata.slug,
          });
        }

        function showSuccessToast() {
          showToast({
            title: intl.formatMessage({
              defaultMessage: 'Woohoo! You completed the question!',
              description:
                'Toast congratulating user once they mark a question as complete',
              id: 'Gv0+LY',
            }),
            variant: 'success',
          });
        }

        function markAsComplete() {
          if (user == null || data?.questionProgress?.status === 'complete') {
            return;
          }

          markCompleteMutation.mutate({
            question: {
              format: metadata.format,
              slug: metadata.slug,
            },
            studyListKey,
          });
        }

        // Only need to do something when correct or wrong outcome.
        switch (outcome) {
          case 'correct': {
            saveSubmission(outcome);
            showSuccessToast();
            markAsComplete();

            return;
          }
          case 'wrong': {
            saveSubmission(outcome);

            return;
          }
        }
      }}
      onFocusConsole={() => {
        tilesDispatch({
          payload: {
            tabId: 'console',
          },
          type: 'tab-set-active',
        });
      }}
      onShowTestCase={(_, index, specParts) => {
        tilesDispatch({
          payload: {
            fallbackNeighborTabId: openBesideTabId,
            tabId: 'submission_test_cases',
          },
          type: 'tab-set-active-otherwise-open',
        });
        setTimeout(() => {
          dispatch(
            focusOnTest({
              filePath: specPath,
              index,
              specParts,
            }),
          );
        }, 0);
      }}
      onShowTestsCases={(specMode: 'run' | 'submit') => {
        if (specMode === 'run') {
          tilesDispatch({
            payload: {
              fallbackNeighborTabId: openBesideTabId,
              tabId: 'run_tests',
            },
            type: 'tab-set-active-otherwise-open',
          });
        } else {
          tilesDispatch({
            payload: {
              fallbackNeighborTabId: openBesideTabId,
              tabId: 'submission_test_cases',
            },
            type: 'tab-set-active-otherwise-open',
          });
        }
      }}
    />
  );
}
