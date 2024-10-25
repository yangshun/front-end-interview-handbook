import type { ComponentProps, ReactElement } from 'react';

import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import JavaScriptCodingQuizCodeEditor from '~/components/workspace/javascript/JavaScriptCodingQuizCodeEditor';

const JavascriptLanguage = 'js';

type Props = ComponentProps<'pre'>;

// Wrapper around MDXCodeBlock
export default function MDXCodeBlockWrapper(parentProps: Props): JSX.Element {
  const { children } = parentProps;
  const { props } = children as ReactElement;

  const language = props.className ? props.className?.split('-')[1] : null;

  // If the language is JavaScript, render the Monaco Editor with executable code

  if (language === JavascriptLanguage) {
    const codeBlockContent = props.children;

    return <JavaScriptCodingQuizCodeEditor initialCode={codeBlockContent} />;
  }

  // For other languages, render the MDXCodeBlock as usual (passed via children)
  return <MDXCodeBlock {...parentProps} />;
}
