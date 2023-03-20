import { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import EmptyState from '~/components/ui/EmptyState';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import JavaScriptTestCodesEmitter from './JavaScriptTestCodesEmitter';
type Props = Readonly<{
  contents: string | null;
  isContentsHidden?: boolean;
}>;

function highlightElement(
  el: HTMLElement | null,
  testPath: ReadonlyArray<string>,
  targetTestPathIndex: number,
) {
  if (el == null || testPath.length === 0) {
    return;
  }

  // Prism-specific class.
  const tokens = el.querySelectorAll('.token');
  let currentIndex = 0;
  let tokenContainingPath: Element | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const currentPath = testPath[currentIndex];

    if (tokens[i].textContent === `'${currentPath}'`) {
      tokenContainingPath = tokens[i];
      currentIndex++;
    }
    if (currentIndex > targetTestPathIndex) {
      break;
    }
  }
  if (tokenContainingPath == null) {
    return;
  }
  tokenContainingPath.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  });
  setTimeout(() => {
    const highlightClassTokens = [
      '!bg-yellow-300',
      '!text-slate-900',
      'transition-colors',
    ];

    tokenContainingPath?.classList.add(...highlightClassTokens);
    setTimeout(() => {
      tokenContainingPath?.classList.remove(...highlightClassTokens);
    }, 1000);
  }, 500);
}

export default function QuestionContentsJavaScriptTestsCode({
  contents,
  isContentsHidden = false,
}: Props) {
  const codeRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  useEffect(() => {
    function highlight({
      index,
      path,
    }: Readonly<{
      index: number;
      path: ReadonlyArray<string>;
    }>) {
      // Push to next tick in case the test cases panel not shown yet.
      setTimeout(() => {
        highlightElement(codeRef.current, path, index);
      }, 100);
    }
    JavaScriptTestCodesEmitter.on('focus_on_test', highlight);

    return () => {
      JavaScriptTestCodesEmitter.off('focus_on_test', highlight);
    };
  }, []);
  if (isContentsHidden) {
    return <QuestionPaywall />;
  }
  if (contents == null) {
    return (
      <EmptyState
        title={intl.formatMessage({
          defaultMessage: 'No Tests',
          description:
            'Label indicating that no test cases are available for this question',
          id: 'bQ3XUx',
        })}
        variant="empty"
      />
    );
  }

  return (
    <div>
      <Text color="secondary" display="block" variant="body2">
        <FormattedMessage
          defaultMessage="For your reference, these are the Jest tests that your code will run against."
          description="Text indicating to users that the below section are test cases that their code will be tested against"
          id="nPkj31"
        />
      </Text>
      <Prose>
        <div ref={codeRef}>
          <MDXCodeBlock showCopyButton={false}>{contents}</MDXCodeBlock>
        </div>
      </Prose>
    </div>
  );
}
