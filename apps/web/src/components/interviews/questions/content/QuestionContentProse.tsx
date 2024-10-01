import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import { FormattedMessage } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';
import EmptyState from '~/components/ui/EmptyState';
import type { ProseTextSize } from '~/components/ui/Prose';
import Prose from '~/components/ui/Prose';

import QuestionPaywall from '../common/QuestionPaywall';

export default function QuestionContentProse({
  contents,
  isContentsHidden = false,
  textSize = 'sm',
}: Readonly<{
  contents: string | null;
  isContentsHidden?: boolean;
  textSize?: ProseTextSize;
}>) {
  // It's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Contents = useMemo(() => {
    if (!contents) {
      return null;
    }

    return getMDXComponent(contents, {
      MDXCodeBlock,
    });
  }, [contents]);

  if (isContentsHidden) {
    return <QuestionPaywall />;
  }

  if (Contents == null) {
    return (
      <EmptyState
        title={
          <FormattedMessage
            defaultMessage="Not written for this question."
            description="Text that apppears if a solution has not been written for the question"
            id="CNjnh0"
          />
        }
        variant="empty"
      />
    );
  }

  return (
    <Prose className="break-words" textSize={textSize}>
      <Contents components={MDXComponents} />
    </Prose>
  );
}
