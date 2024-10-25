import clsx from 'clsx';
import { useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import SideNavigation from '~/components/common/SideNavigation';
import TypingString from '~/components/common/TypingString';
import { FormattedMessage } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeGlassyBorder,
  themeGradientHeading,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

const HIGHLIGHT_MATCH_START_REGEX = /\/\*\s*hl:s(\((\w*)\))?\s*\*\//;
const HIGHLIGHT_MATCH_END_REGEX = /\/\*\s*hl:e\s*\*\//;

type QuestionSlug = 'data-table' | 'deep-clone' | 'flatten';

const questions: ReadonlyArray<{
  code: string;
  label: string;
  value: QuestionSlug;
}> = [
  {
    code: `/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  return /* hl:s(yangshun) */value/* hl:e */.reduce(
    (acc, curr) => /*   hl:s(zhenghao) */acc.concat(Array.isArray(curr) ? flatten(curr) : curr)/* hl:e */,
    [],
  );
}
`,
    label: 'Flatten',
    value: 'flatten',
  },
  {
    code: `/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  if (/* hl:s(yangshun) */typeof value !== 'object' || value === null/* hl:e */) {
    return value;
  }

  if (/* hl:s(yangshun) */Array.isArray(value)/* hl:e */) {
    return value.map((item) => deepClone(item));
  }

  return /* hl:s(yangshun) */Object.fromEntries/* hl:e */(
    Object.entries(value).map(([key, value]) => [key, deepClone(value)]),
  );
}
`,
    label: 'Deep Clone',
    value: 'deep-clone',
  },
  {
    code: `/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  return /* hl:s(yangshun) */value/* hl:e */.reduce(
    (acc, curr) => /*   hl:s(zhenghao) */acc.concat(Array.isArray(curr) ? flatten(curr) : curr)/* hl:e */,
    [],
  );
}
`,
    label: 'Data Table',
    value: 'data-table',
  },
] as const;

function getAnnotationData(highlightId: string | null):
  | Readonly<{
      alignment: 'end' | 'start';
      className: string;
      contents: ReactNode;
      highlightClass: string;
    }>
  | null
  | undefined {
  if (highlightId == null) {
    return null;
  }

  switch (highlightId) {
    case 'yangshun': {
      return {
        alignment: 'start',
        className: clsx('bg-neutral-900/90', 'border-cyan-500'),
        contents: (
          <CodeAnnotationContents
            contents="This has performance benefits"
            name="Yangshun"
          />
        ),
        highlightClass: clsx('bg-cyan-500/10', 'outline-cyan-500'),
      };
    }
    case 'zhenghao': {
      return {
        alignment: 'end',
        className: clsx('bg-neutral-900/90', 'border-green-500'),
        contents: (
          <CodeAnnotationContents
            contents="Using ternary operator makes the code more concise"
            name="Zhenghao"
          />
        ),
        highlightClass: clsx('bg-green-500/10', 'outline-green-500'),
      };
    }
  }
}

function CodeAnnotationContents({
  contents,
  name,
}: Readonly<{
  contents: string;
  name: string;
}>) {
  const [showContents, setShowContents] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContents(true);
    }, 1500);
  }, []);

  return (
    <div className="flex min-w-[150px] max-w-[200px] flex-col gap-0.5">
      <Text color="light" size="body3" weight="medium">
        {name}
      </Text>
      {showContents && (
        <Text
          className="whitespace-normal text-neutral-300"
          color="inherit"
          size="body3">
          <TypingString characters={contents} />
        </Text>
      )}
    </div>
  );
}

function CodeAnnotation({
  alignment = 'start',
  children,
  className,
  isShown,
}: Readonly<{
  alignment?: 'end' | 'start' | null;
  children: ReactNode;
  className?: string;
  isShown?: boolean;
}>) {
  return (
    <div
      className={clsx(
        'font-sans',
        'absolute bottom-0 -translate-y-5',
        alignment === 'start' && 'left-0 -ml-1',
        alignment === 'end' && 'right-0 -mr-0.5',
        'px-2 py-1',
        'border',
        'rounded-t-lg',
        'transition-all',
        'delay-500',
        'duration-500',
        className,
        isShown ? 'opacity-100' : 'opacity-0',
      )}>
      {children}
    </div>
  );
}

export default function InterviewsMarketingSolutionsByExInterviewersSection() {
  const codeBlockRef = useRef(null);
  const showAnnotations = useInView(codeBlockRef, {
    amount: 'all',
    once: true,
  });

  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionSlug>('flatten');

  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-xl pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Every question answered by ex-interviewers"
          description="Title for marketing page section"
          id="LMI4bA"
        />
      </Heading>
      <Section>
        <div className="mt-16 flex grid-cols-12 flex-col gap-6 lg:grid">
          <div className={clsx('flex flex-col gap-10', 'col-span-5')}>
            <Text
              className={clsx(
                'block',
                'text-base lg:text-lg',
                'lg:font-medium',
                'max-w-md lg:max-w-2xl',
              )}
              color="secondary"
              size="inherit"
              weight="inherit">
              <FormattedMessage
                defaultMessage="Referencing good solutions is crucial to learning effectively. We've written our solutions with special care to include practical considerations and multiple approaches."
                description="Marketing page section subtitle"
                id="jGbCXt"
              />
            </Text>
            <div className="flex flex-col gap-6">
              <Text
                className={clsx(
                  'block',
                  'text-base lg:text-lg',
                  'lg:font-medium',
                )}
                color="subtitle"
                size="inherit"
                weight="inherit">
                <FormattedMessage
                  defaultMessage="Example solutions"
                  description="Example code solutions"
                  id="egSWgk"
                />
              </Text>
              <SideNavigation
                activeValue={selectedQuestion}
                items={questions}
                onClick={(value) => {
                  setSelectedQuestion(value);
                }}
              />
            </div>
          </div>
          <div ref={codeBlockRef} className="prose col-span-7 text-sm">
            <div
              className={clsx(
                'isolate',
                'code-block__marketing overflow-hidden rounded-xl',
                [
                  themeWhiteGlowCardBackground,
                  'before:-left-10 before:-top-24 before:z-[1]',
                ],
              )}>
              <div
                className={clsx(
                  '!absolute inset-0 top-0 rounded-[inherit]',
                  themeGlassyBorder,
                )}
              />
              <div className="m-0.5 overflow-hidden rounded-[inherit]">
                <MDXCodeBlock
                  renderLineContents={({ line, getTokenProps }) => {
                    const lineContents = [];

                    for (let index_ = 0; index_ < line.length; index_++) {
                      const tokenKey = index_;
                      const token = line[tokenKey];
                      let tokenEl = (
                        <span
                          {...getTokenProps({
                            token,
                          })}
                          key={tokenKey}
                        />
                      );

                      if (HIGHLIGHT_MATCH_START_REGEX.test(token.content)) {
                        const highlightIdMatches =
                          HIGHLIGHT_MATCH_START_REGEX.exec(token.content);
                        const highlightId =
                          highlightIdMatches != null
                            ? highlightIdMatches[2]
                            : null;

                        index_++;

                        const highlightContents = [];
                        let highlightedToken = line[index_];

                        while (
                          !HIGHLIGHT_MATCH_END_REGEX.test(
                            highlightedToken.content,
                          )
                        ) {
                          highlightContents.push(
                            <span
                              data-key={highlightId}
                              {...getTokenProps({
                                token: highlightedToken,
                              })}
                              key={tokenKey}
                            />,
                          );

                          index_++;
                          highlightedToken = line[index_];
                        }

                        const annotationData = getAnnotationData(highlightId);

                        tokenEl = (
                          <span
                            className={clsx(
                              'rounded-sm',
                              'transition-all',
                              'relative',
                              'outline-1 outline-offset-2',
                              showAnnotations && 'outline',
                              annotationData?.highlightClass,
                            )}>
                            {annotationData?.contents && (
                              <CodeAnnotation
                                alignment={annotationData?.alignment}
                                className={annotationData?.className}
                                isShown={showAnnotations}>
                                {annotationData.contents}
                              </CodeAnnotation>
                            )}
                            {highlightContents}
                          </span>
                        );
                      }

                      lineContents.push(tokenEl);
                    }

                    return lineContents;
                  }}
                  showCopyButton={false}>
                  {
                    questions.find(({ value }) => selectedQuestion === value)
                      ?.code
                  }
                </MDXCodeBlock>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
