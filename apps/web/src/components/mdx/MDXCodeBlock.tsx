'use client';

import copy from 'copy-text-to-clipboard';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import codeTheme from 'prism-react-renderer/themes/dracula';
import type { ComponentProps, ReactElement } from 'react';
import { useCallback, useRef, useState } from 'react';

import useHoverState from '~/hooks/useHoverState';

import Button from '~/components/ui/Button';

import { CheckIcon, Square2StackIcon } from '@heroicons/react/24/outline';

type Props = ComponentProps<'pre'> &
  Readonly<{
    language?: Language;
    showCopyButton?: boolean;
  }>;

function CopyButton({ contents }: Readonly<{ contents: string }>) {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | null>(null);
  const handleCopyCode = useCallback(() => {
    if (isCopied) {
      return false;
    }

    copy(contents);
    setIsCopied(true);
    copyTimeout.current = window.setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [contents, isCopied]);

  return (
    <Button
      className="absolute right-2 top-2 p-1"
      icon={isCopied ? CheckIcon : Square2StackIcon}
      isLabelHidden={true}
      label={isCopied ? 'Copied!' : 'Copy code to clipboard'}
      size="sm"
      variant="tertiary"
      onClick={handleCopyCode}
    />
  );
}

// If this component is ever renamed you need to rename the solutions importing
// this file along with the mdxBundler global deps.
export default function MDXCodeBlock({
  children,
  language = 'jsx',
  showCopyButton = true,
}: Props): JSX.Element {
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();

  const code = (() => {
    if (children == null) {
      return null;
    }

    if (typeof children === 'string') {
      return children;
    }

    if (
      typeof children === 'object' &&
      (children as ReactElement).type === 'code'
    ) {
      return (children as ReactElement).props.children;
    }

    return null;
  })();

  if (code == null) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  const lang = language; // TODO: read from markup.

  // Direct usage of MDXCodeBlock in MDX.
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {isHovered && showCopyButton && <CopyButton contents={code} />}
      <Highlight
        {...defaultProps}
        code={code.trim()}
        language={lang}
        theme={codeTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, index) => {
              const { key: lineKey, ...lineProps } = getLineProps({
                key: index,
                line,
              });

              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={lineKey} {...lineProps}>
                  {line.map((token, index_) => {
                    const { key: tokenKey, ...tokenProps } = getTokenProps({
                      key: index_,
                      token,
                    });

                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <span key={tokenKey} {...tokenProps} />
                    );
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
