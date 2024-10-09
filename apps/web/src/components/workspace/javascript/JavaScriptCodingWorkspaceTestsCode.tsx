import { useEffect, useRef } from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import Alert from '~/components/ui/Alert';
import EmptyState from '~/components/ui/EmptyState';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import JavaScriptTestCodesEmitter from './JavaScriptTestCodesEmitter';

type Props = Readonly<{
  contents: string | null;
  isContentsHidden?: boolean;
  specPath: string;
}>;

function highlightElement(
  el: HTMLElement | null,
  specParts: ReadonlyArray<string>,
  targetTestPathIndex: number,
) {
  if (el == null || specParts.length === 0) {
    return;
  }

  // Prism-specific class.
  const tokens = el.querySelectorAll('.token');
  let currentIndex = 0;
  let tokenContainingPath: Element | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const currentPath = specParts[currentIndex];

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

  const highlightClassTokens = [
    '!bg-brand',
    '!text-neutral-900',
    'transition-colors',
  ];

  tokenContainingPath?.classList.add(...highlightClassTokens);
  setTimeout(() => {
    tokenContainingPath?.classList.remove(...highlightClassTokens);
  }, 1000);
}

export default function JavaScriptCodingWorkspaceTestsCode({
  contents,
  specPath,
}: Props) {
  const codeRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  useEffect(() => {
    function highlight({
      index,
      filePath,
      specParts,
    }: Readonly<{
      filePath: string;
      index: number;
      specParts: ReadonlyArray<string>;
    }>) {
      if (specPath !== filePath) {
        return;
      }

      // Push to next tick in case the test cases panel not shown yet.
      setTimeout(() => {
        highlightElement(codeRef.current, specParts, index);
      }, 100);
    }
    JavaScriptTestCodesEmitter.on('focus_on_test', highlight);

    return () => {
      JavaScriptTestCodesEmitter.off('focus_on_test', highlight);
    };
  }, [specPath]);

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
    <div className="flex flex-col">
      <Alert variant="info">
        <Text className="block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="For your reference, these are the tests used when your code is submitted. They cannot be modified."
            description="Text indicating to users that the below section are test cases that their code will be tested against"
            id="qh0zg0"
          />
        </Text>
      </Alert>
      <Prose textSize="sm">
        <div ref={codeRef}>
          <MDXCodeBlock showCopyButton={false}>{contents}</MDXCodeBlock>
        </div>
      </Prose>
    </div>
  );
}
