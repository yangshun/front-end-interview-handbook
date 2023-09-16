import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';

import {
  useMutationQuestionProgressAdd,
  useQueryQuestionProgress,
} from '~/db/QuestionsProgressClient';
import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';
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
  const { dispatch } = useTilesContext();
  const { status } = useCodingWorkspaceContext();
  const addProgressMutation = useMutationQuestionProgressAdd();
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
      onComplete={(testResults) => {
        if (testResults.pass !== testResults.total) {
          return;
        }

        showToast({
          title: intl.formatMessage({
            defaultMessage: `Woohoo! You completed the question!`,
            description:
              'Toast congratulating user once they mark a question as complete',
            id: 'Gv0+LY',
          }),
          variant: 'success',
        });

        // Mark as completed in database for logged-in users.
        if (user != null && questionProgress?.status !== 'complete') {
          addProgressMutation.mutate({
            format: metadata.format,
            listKey: searchParams?.get('list') ?? undefined,
            progressId: questionProgress?.id,
            slug: metadata.slug,
            status: 'complete',
          });
        }
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
