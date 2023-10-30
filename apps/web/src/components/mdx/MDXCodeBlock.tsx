'use client';

import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import codeTheme from 'prism-react-renderer/themes/dracula';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { RiCheckLine, RiFileCopyLine } from 'react-icons/ri';

import useCopyToClipboardWithRevert from '~/hooks/useCopyToClipboardWithRevert';
import useHoverState from '~/hooks/useHoverState';

import Button from '~/components/ui/Button';

import TabsUnderline from '../ui/Tabs/TabsUnderline';

type LanguagesCode = Partial<Record<Language, React.ReactNode>>;
type LanguagesLabels = Partial<Record<Language, string>>;

const languagesLabel: LanguagesLabels = {
  javascript: 'JavaScript',
  jsx: 'JavaScript',
  tsx: 'TypeScript',
  typescript: 'TypeScript',
};

export type Props = ComponentProps<'pre'> &
  Readonly<{
    language?: Language;
    languages?: LanguagesCode;
    renderExtraButtons?: (code: string) => ReactNode;
    showCopyButton?: boolean;
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

function convertContentToCode(children: React.ReactNode): string | null {
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
}

// If this component is ever renamed you need to rename the solutions importing
// this file along with the mdxBundler global deps.
export default function MDXCodeBlock({
  children,
  showCopyButton = true,
  renderExtraButtons,
  language = 'jsx',
  languages = {},
}: Props): JSX.Element {
  let lang: keyof LanguagesCode = 'jsx';
  const allLanguages: Partial<Record<Language, string>> = {};

  if (language && children) {
    const codeString = convertContentToCode(children);

    if (codeString != null) {
      allLanguages[language] = codeString;
    }
  }

  for (lang in languages) {
    if (Object.prototype.hasOwnProperty.call(languages, lang)) {
      const codeString = convertContentToCode(languages[lang]);

      if (codeString != null) {
        allLanguages[lang] = codeString;
      }
    }
  }

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
          {...defaultProps}
          code={selectedCode.trim()}
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
                  <div key={lineKey} {...lineProps}>
                    {line.map((token, index_) => {
                      const { key: tokenKey, ...tokenProps } = getTokenProps({
                        key: index_,
                        token,
                      });

                      return <span key={tokenKey} {...tokenProps} />;
                    })}
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
