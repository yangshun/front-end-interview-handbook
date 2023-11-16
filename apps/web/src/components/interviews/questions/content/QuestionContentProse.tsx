import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';
import type { ProseTextSize } from '~/components/ui/Prose';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

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
    // TODO: Change to empty state.
    return (
      <Text color="secondary" display="block" weight="bold">
        <FormattedMessage
          defaultMessage="Not written for this question."
          description="Text that apppears if a solution has not been written for the question"
          id="CNjnh0"
        />
      </Text>
    );
  }

  return (
    <Prose textSize={textSize}>
      <Contents components={MDXComponents} />
    </Prose>
  );
}