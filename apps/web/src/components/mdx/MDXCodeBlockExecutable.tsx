import type { ComponentProps } from 'react';

import MDXCodeBlock, {
  convertContentToCode,
} from '~/components/mdx/MDXCodeBlock';
import JavaScriptCodingQuizCodeEditor from '~/components/workspace/javascript/JavaScriptCodingQuizCodeEditor';

type Props = ComponentProps<'pre'>;

export default function MDXCodeBlockExecutable(props: Props): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  const result = convertContentToCode(props.children);

  // If the language is JavaScript, render Monaco Editor with executable code.
  if (result?.language === 'js' && result?.code != null) {
    return <JavaScriptCodingQuizCodeEditor {...props} />;
  }

  // For other languages, render the MDXCodeBlock as usual.
  return <MDXCodeBlock {...props} />;
}
