import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import JavaScriptTestCodesEmitter from '~/components/workspace/javascript/JavaScriptTestCodesEmitter';

import {
  useMutationQuestionProgressAdd,
  useQueryQuestionProgress,
} from '~/db/QuestionsProgressClient';
import { staticUpperCase } from '~/utils/typescript/stringTransform';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';
import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';
import TestsSection from '../common/tests/TestsSection';

import { useUser } from '@supabase/auth-helpers-react';

export default function JavaScriptCodingWorkspaceTestsSubmitTab({
  metadata,
  specPath,
}: Readonly<{
  metadata: QuestionMetadata;
  specPath: string;
}>) {
  const intl = useIntl();
  const { dispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const { status } = useCodingWorkspaceContext();
  const { language, mainFileCode } = useJavaScriptCodingWorkspaceContext();
  const addProgressMutation = useMutationQuestionProgressAdd();
  const javaScriptAddSubmissionMutation =
    trpc.questionSubmission.javaScriptAdd.useMutation();

  const user = useUser();
  const { data: questionProgress } = useQueryQuestionProgress(metadata);
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 'submitting') {
      dispatch({
        payload: {
          tabId: 'submit',
        },
        type: 'tab-set-active',
      });
    }
  }, [dispatch, status]);

  return (
    <TestsSection
      specMode="submit"
      specPath={specPath}
      onComplete={(outcome) => {
        // We only care about correct or wrong outcomes.
        if (outcome !== 'correct' && outcome !== 'wrong') {
          return;
        }

        if (outcome === 'correct') {
          showToast({
            title: intl.formatMessage({
              defaultMessage: `Woohoo! You completed the question!`,
              description:
                'Toast congratulating user once they mark a question as complete',
              id: 'Gv0+LY',
            }),
            variant: 'success',
          });
        }

        if (user != null) {
          // Mark as completed in database for logged-in users.
          if (questionProgress?.status !== 'complete') {
            addProgressMutation.mutate({
              format: metadata.format,
              listKey: searchParams?.get('list') ?? undefined,
              progressId: questionProgress?.id,
              slug: metadata.slug,
              status: 'complete',
            });
          }

          javaScriptAddSubmissionMutation.mutate({
            code: mainFileCode,
            language: staticUpperCase(language),
            result: staticUpperCase(outcome),
            slug: metadata.slug,
          });
        }
      }}
      onShowTestCase={(_, index, specParts) => {
        dispatch({
          payload: {
            tabId: 'test_cases',
          },
          type: 'tab-set-active',
        });
        JavaScriptTestCodesEmitter.emit('focus_on_test', {
          filePath: specPath,
          index,
          specParts,
        });
      }}
      onShowTestsCases={() => {
        dispatch({
          payload: {
            tabId: 'test_cases',
          },
          type: 'tab-set-active',
        });
      }}
    />
  );
}
