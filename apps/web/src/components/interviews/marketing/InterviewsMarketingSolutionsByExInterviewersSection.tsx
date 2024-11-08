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

const HIGHLIGHT_MATCH_START_REGEX = /\/\*\s*hl:s(\(([\w-]*)\))?\s*\*\//;
const HIGHLIGHT_MATCH_END_REGEX = /\/\*\s*hl:e\s*\*\//;

type QuestionSlug = 'deep-clone' | 'flatten' | 'like-button';

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
  return value./* hl:s(flatten-i) */reduce/* hl:e */(
    (acc, curr) => acc.concat(Array.isArray(curr)
      ? /* hl:s(flatten-ii) */flatten(curr)/* hl:e */ : curr),
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
  if (/* hl:s(deepclone-i) */typeof value !== 'object' || value === null/* hl:e */) {
    return value;
  }

  if (/* hl:s(deepclone-ii) */Array.isArray(value)/* hl:e */) {
    return value.map((item) => deepClone(item));
  }

  return /* hl:s(deepclone-iii) */Object.fromEntries/* hl:e */(
    Object.entries(value).map(([key, value]) => [key, deepClone(value)]),
  );
}
`,
    label: 'Deep Clone',
    value: 'deep-clone',
  },
  {
    code: `function LikeButton() {
  return (
    <div className="button-container">
      <button
        className={classNames(
          'like-button',
          /* hl:s(like-button-i) */liked/* hl:e */
            ? 'like-button--liked'
            : 'like-button--default',
        )}
        disabled={isPending}
        onClick={() => {
          likeUnlikeAction();
        }}>
        {/* hl:s(like-button-ii) */isPending ? <SpinnerIcon /> : <HeartIcon />/* hl:e */}
        {liked ? 'Liked' : 'Like'}
      </button>
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
`,
    label: 'Like Button',
    value: 'like-button',
  },
] as const;

function getAnnotationData(highlightId: string | null):
  | Readonly<{
      alignment: 'end' | 'start';
      className: string;
      contents: ReactNode;
      highlightClass: string;
      position?: 'bottom' | 'top';
    }>
  | null
  | undefined {
  if (highlightId == null) {
    return null;
  }

  const pinkClassName = clsx('bg-neutral-900/90', 'border-pink-500');
  const pinkHighlightClassName = clsx('bg-pink-500/10', 'outline-pink-500');

  const greenClassName = clsx('bg-neutral-900/90', 'border-green-500');
  const greenHighlightClassName = clsx('bg-green-500/10', 'outline-green-500');

  const orangeClassName = clsx('bg-neutral-900/90', 'border-orange-500');
  const orangeHighlightClassName = clsx(
    'bg-orange-500/10',
    'outline-orange-500',
  );

  switch (highlightId) {
    case 'flatten-i': {
      return {
        alignment: 'start',
        className: pinkClassName,
        contents: (
          <CodeAnnotationContents
            className="w-[200px]"
            contents="Reduce is suitable since we want to iterate through every element and consolidate them"
            name="Yangshun"
          />
        ),
        highlightClass: pinkHighlightClassName,
      };
    }
    case 'flatten-ii': {
      return {
        alignment: 'end',
        className: greenClassName,
        contents: (
          <CodeAnnotationContents
            className="w-[150px]"
            contents="Recursively call flatten() on nested arrays"
            name="Zhenghao"
          />
        ),
        highlightClass: greenHighlightClassName,
        position: 'bottom',
      };
    }
    case 'deepclone-i': {
      return {
        alignment: 'start',
        className: pinkClassName,
        contents: (
          <CodeAnnotationContents
            className="w-[300px]"
            contents="Handle primitive and null-ish values first by returning directly"
            name="Yangshun"
          />
        ),
        highlightClass: pinkHighlightClassName,
      };
    }
    case 'deepclone-ii': {
      return {
        alignment: 'start',
        className: greenClassName,
        contents: (
          <CodeAnnotationContents
            className="w-[300px]"
            contents="Recursively handle arrays by calling deepClone() on each item into a new array"
            name="Zhenghao"
          />
        ),
        highlightClass: greenHighlightClassName,
      };
    }
    case 'deepclone-iii': {
      return {
        alignment: 'start',
        className: orangeClassName,
        contents: (
          <CodeAnnotationContents
            className="w-[300px]"
            contents="Recursively handle objects by calling deepClone() on each entry into a new object"
            name="Yangshun"
          />
        ),
        highlightClass: orangeHighlightClassName,
        position: 'bottom',
      };
    }
    case 'like-button-i': {
      return {
        alignment: 'start',
        className: pinkClassName,
        contents: (
          <CodeAnnotationContents
            className="w-[300px]"
            contents="Conditionally use the appropriate classname"
            name="Yangshun"
          />
        ),
        highlightClass: pinkHighlightClassName,
      };
    }
    case 'like-button-ii': {
      return {
        alignment: 'start',
        className: greenClassName,
        contents: (
          <CodeAnnotationContents
            className="w-[300px]"
            contents="Be sure to add aria-hidden to hide icons from screen readers"
            name="Zhenghao"
          />
        ),
        highlightClass: greenHighlightClassName,
        position: 'bottom',
      };
    }
  }
}

function CodeAnnotationContents({
  className,
  contents,
  name,
}: Readonly<{
  className: string;
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
    <div className={clsx('flex min-w-[150px] flex-col gap-0.5', className)}>
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
  position = 'top',
}: Readonly<{
  alignment?: 'end' | 'start' | null;
  children: ReactNode;
  className?: string;
  isShown?: boolean;
  position?: 'bottom' | 'top';
}>) {
  return (
    <div
      className={clsx(
        'font-sans',
        'absolute',
        position === 'top' && 'bottom-0 -translate-y-5 rounded-t-lg',
        position === 'bottom' && 'top-0 translate-y-5 rounded-b-lg',
        alignment === 'start' && 'left-0 -ml-1',
        alignment === 'end' && 'right-0 -mr-0.5',
        'px-2 py-1',
        'border',
        'transition-all',
        'duration-500',
        'hover:opacity-10',
        isShown ? 'opacity-100' : 'opacity-0 delay-500',
        'select-none',
        className,
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
    <Container className={clsx('py-20')} width="marketing">
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
        <div
          className={clsx(
            'flex grid-cols-12 flex-col gap-6 lg:grid',
            'mt-12 lg:mt-16',
          )}>
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
                              key={index_}
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
                                isShown={showAnnotations}
                                position={annotationData?.position}>
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
