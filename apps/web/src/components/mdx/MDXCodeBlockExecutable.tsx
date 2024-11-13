import type { ComponentProps } from 'react';

import MDXCodeBlock, {
  convertContentToCode,
} from '~/components/mdx/MDXCodeBlock';
import JavaScriptCodingQuizCodeEditor from '~/components/workspace/javascript/JavaScriptCodingQuizCodeEditor';

type Props = ComponentProps<'pre'> & Readonly<{ live?: boolean }>;

export default function MDXCodeBlockExecutable(props: Props): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  const result = convertContentToCode(props.children);

  const { live } = props;

  // If there is a live attribute, render Monaco Editor with executable code.
  if (live && result?.code != null) {
    return <JavaScriptCodingQuizCodeEditor {...props} />;
  }

  // For other languages, render the MDXCodeBlock as usual.
  return <MDXCodeBlock {...props} />;
}
