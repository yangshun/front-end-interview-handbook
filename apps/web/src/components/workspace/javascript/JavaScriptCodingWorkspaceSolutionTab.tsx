import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import InterviewsPurchasePaywall from '~/components/interviews/purchase/InterviewsPurchasePaywall';
import useQuestionLogEventCopyContents from '~/components/interviews/questions/common/useQuestionLogEventCopyContents';
import type { Props as MDXCodeBlockProps } from '~/components/mdx/MDXCodeBlock';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';
import Prose from '~/components/ui/Prose';

import JavaScriptCodingWorkspacePushCodeToEditorButton from './JavaScriptCodingWorkspacePushCodeToEditorButton';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  solution: string | null;
}>;

function MDXCodeBlockWithPushButton(props: MDXCodeBlockProps) {
  return (
    <MDXCodeBlock
      renderExtraButtons={(code) => (
        <JavaScriptCodingWorkspacePushCodeToEditorButton contents={code} />
      )}
      {...props}
    />
  );
}

export default function JavaScriptCodingWorkspaceSolutionTab({
  canViewPremiumContent,
  solution,
}: Props) {
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  // It's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Contents = useMemo(() => {
    if (!solution) {
      return null;
    }

    return getMDXComponent(solution, {
      MDXCodeBlock: MDXCodeBlockWithPushButton,
    });
  }, [solution]);

  if (Contents == null) {
    if (canViewPremiumContent) {
      return null;
    }

    return (
      <div className="flex w-full items-center justify-center">
        <InterviewsPurchasePaywall
          background="vignette"
          premiumFeature="official-solutions"
        />
      </div>
    );
  }

  return (
    <div ref={copyRef} className="w-full">
      <div className="mx-auto max-w-3xl p-4">
        <Prose textSize="sm">
          <Contents components={MDXComponents} />
        </Prose>
      </div>
    </div>
  );
}
