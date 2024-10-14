'use client';

import clsx from 'clsx';
import type {
  Language,
  Token,
  TokenInputProps,
  TokenOutputProps,
} from 'prism-react-renderer';
import { Highlight, themes } from 'prism-react-renderer';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { RiCheckLine, RiFileCopyLine } from 'react-icons/ri';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';
import useHoverState from '~/hooks/useHoverState';

import Button from '~/components/ui/Button';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

type LanguagesCode = Partial<Record<Language, React.ReactNode>>;
type LanguagesLabels = Partial<Record<Language, string>>;

const languagesLabel: LanguagesLabels = {
  javascript: 'JavaScript',
  jsx: 'JavaScript',
  tsx: 'TypeScript',
  typescript: 'TypeScript',
};

type GetTokenProps = (input: TokenInputProps) => TokenOutputProps;

export type Props = ComponentProps<'pre'> &
  Readonly<{
    language?: Language;
    languages?: LanguagesCode;
    renderExtraButtons?: (code: string) => ReactNode;
    renderLineContents?: (params: {
      getTokenProps: GetTokenProps;
      line: Array<Token>;
    }) => Array<ReactNode>;
    showCopyButton?: boolean;
    showLineNumbers?: boolean;
  }>;

function CopyButton({ contents }: Readonly<{ contents: string }>) {
  const [isCopied, onCopy] = useCopyToClipboardWithRevert(1000);

  return (
    <Button
      icon={isCopied ? RiCheckLine : RiFileCopyLine}
      isLabelHidden={true}
      label={isCopied ? 'Copied!' : 'Copy code to clipboard'}
      size="xs"
      variant="secondary"
      onClick={() => onCopy(contents)}
    />
  );
}

function convertContentToCode(
  children: React.ReactNode,
): Readonly<{ code: string; language: Language | null }> | null {
  if (children == null) {
    return null;
  }

  if (typeof children === 'string') {
    return { code: children, language: null };
  }

  if (
    typeof children === 'object' &&
    // TODO: render <code> element as well.
    (children as ReactElement).type === 'code'
  ) {
    const { props } = children as ReactElement;

    return {
      code: props.children,
      // MDX will parse backtick blocks as `language-jsx`,
      // so this is to extract the language.
      language: props.className ? props.className?.split('-')[1] : null,
    };
  }

  return null;
}

// If this component is ever renamed you need to rename the solutions importing
// this file along with the mdxBundler global deps.
export default function MDXCodeBlock({
  children,
  showCopyButton = true,
  showLineNumbers = true,
  renderExtraButtons,
  language = 'jsx',
  languages = {},
  renderLineContents,
}: Props): JSX.Element {
  const allLanguages: Partial<Record<Language, string>> = {};

  if (language && children) {
    const maybeCode = convertContentToCode(children);

    if (maybeCode != null) {
      allLanguages[maybeCode.language ?? language] = maybeCode.code;
    }
  }

  Object.entries(languages).map(([lang, content]) => {
    const maybeCode = convertContentToCode(content);

    if (maybeCode != null) {
      allLanguages[maybeCode.language ?? (lang as Language)] = maybeCode.code;
    }
  });

  if (Object.keys(allLanguages).length === 0) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    throw 'At least one language needed';
  }

  const defaultLanguage = Object.keys(allLanguages)[0] as Language;

  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(defaultLanguage);

  const selectedCode = allLanguages[selectedLanguage] as string;

  // Direct usage of MDXCodeBlock in MDX.
  return (
    <div>
      {Object.keys(allLanguages).length > 1 && (
        <TabsUnderline
          label="Selected language"
          size="xs"
          tabs={(Object.keys(allLanguages) as Array<Language>).map((lng) => ({
            label: languagesLabel[lng] ?? lng,
            value: lng,
          }))}
          value={selectedLanguage}
          onSelect={setSelectedLanguage}
        />
      )}
      <div
        className="relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        {isHovered && (
          <div className="absolute right-2 top-2 flex gap-x-1 p-1">
            {renderExtraButtons?.(selectedCode)}
            {showCopyButton && <CopyButton contents={selectedCode} />}
          </div>
        )}
        <Highlight
          code={selectedCode.trim()}
          language={selectedLanguage}
          theme={themes.dracula}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={clsx(
                'code-block__counter',
                className,
                showLineNumbers && 'pl-0',
              )}
              style={{
                ...style,
                // @ts-expect-error: CSS variable
                '--code-bg-color': style.backgroundColor,
                '--code-color': style.color,
              }}>
              {tokens.map((line, index) => {
                const lineKey = index;
                const { className: lineClassName, ...lineProps } = getLineProps(
                  {
                    key: lineKey,
                    line,
                  },
                );

                const lineContents =
                  renderLineContents != null
                    ? renderLineContents({ getTokenProps, line })
                    : line.map((token, tokenKey) => (
                        <span
                          {...getTokenProps({
                            token,
                          })}
                          // eslint-disable-next-line react/no-array-index-key
                          key={tokenKey}
                        />
                      ));

                return (
                  <div
                    className={clsx(
                      showLineNumbers && 'code-line__counter',
                      lineClassName,
                    )}
                    {...lineProps}
                    key={lineKey}>
                    {lineContents}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
