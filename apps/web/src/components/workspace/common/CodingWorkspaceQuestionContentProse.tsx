import { MDXProvider, useMDXComponents } from '@mdx-js/react';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import { FormattedMessage } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXTestExamples from '~/components/mdx/MDXTestExamples';
import EmptyState from '~/components/ui/EmptyState';
import Prose from '~/components/ui/Prose';

import CodingWorkspaceMDXComponents from './CodingWorkspaceMDXComponents';

export default function CodingWorkspaceQuestionContentProse({
  contents,
}: Readonly<{
  contents: string | null;
}>) {
  // It's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Contents = useMemo(() => {
    if (!contents) {
      return null;
    }

    return getMDXComponent(contents, {
      MDXCodeBlock,
      MdxJsReact: {
        useMDXComponents,
      },
      MDXTestExamples,
    });
  }, [contents]);

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
    <MDXProvider components={CodingWorkspaceMDXComponents}>
      <Prose className="break-words" textSize="sm">
        <Contents components={CodingWorkspaceMDXComponents} />
      </Prose>
    </MDXProvider>
  );
}
