import clsx from 'clsx';
import { useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { RiAmazonFill, RiMetaFill } from 'react-icons/ri';

import SideNavigation from '~/components/common/SideNavigation';
import TypingString from '~/components/common/TypingString';
import type { IntlShape } from '~/components/intl';
import { FormattedMessage, useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';
import Text from '~/components/ui/Text';
import {
  themeGlassyBorder,
  themeGradientHeading,
  themeMarketingHeadingSize,
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

function getAnnotationData(
  intl: IntlShape,
  highlightId: string | null,
):
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
            contents={intl.formatMessage({
              defaultMessage:
                'Reduce can be used since we want to iterate through every element and consolidate them',
              description: 'Code annotation for flatten-i function',
              id: '6DuRnz',
            })}
            icon={RiMetaFill}
            jobTitle="Ex-Meta Engineer"
            name="Yangshun"
          />
        ),
        highlightClass: pinkHighlightClassName,
      };
    }
    case 'flatten-ii': {
      return {
        alignment: 'start',
        className: greenClassName,
        contents: (
          <CodeAnnotationContents
            className="w-[200px]"
            contents={intl.formatMessage({
              defaultMessage: 'Recursively call flatten() on nested arrays',
              description: 'Code annotation for flatten-ii function',
              id: 'oEhQit',
            })}
            icon={RiAmazonFill}
            jobTitle="Ex-Amazon Engineer"
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
            contents={intl.formatMessage({
              defaultMessage:
                'Handle primitive and null-ish values first by returning directly',
              description: 'Code annotation for deepclone-i function',
              id: 'FGf1M1',
            })}
            icon={RiMetaFill}
            jobTitle="Ex-Meta Engineer"
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
            contents={intl.formatMessage({
              defaultMessage:
                'Recursively handle arrays by calling deepClone() on each item into a new array',
              description: 'Code annotation for deepclone-ii function',
              id: '9ieIKK',
            })}
            icon={RiAmazonFill}
            jobTitle="Ex-Amazon Engineer"
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
            contents={intl.formatMessage({
              defaultMessage:
                'Recursively handle objects by calling deepClone() on each entry into a new object',
              description: 'Code annotation for deepclone-iii function',
              id: 'atoXPf',
            })}
            icon={RiMetaFill}
            jobTitle="Ex-Meta Engineer"
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
            contents={intl.formatMessage({
              defaultMessage: 'Conditionally use the appropriate classname',
              description: 'Code annotation for like-button-i function',
              id: 'AnCQmx',
            })}
            icon={RiMetaFill}
            jobTitle="Ex-Meta Engineer"
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
            contents={intl.formatMessage({
              defaultMessage:
                'Be sure to add aria-hidden to hide icons from screen readers',
              description: 'Code annotation for like-button-ii function',
              id: 'xH+Wrx',
            })}
            icon={RiAmazonFill}
            jobTitle="Ex-Amazon Engineer"
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
  icon: Icon,
  jobTitle,
  name,
}: Readonly<{
  className: string;
  contents: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  jobTitle: string;
  name: string;
}>) {
  const [showContents, setShowContents] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContents(true);
    }, 180);
  }, []);

  return (
    <div className={clsx('flex min-w-[150px] flex-col gap-0.5', className)}>
      <div className="flex items-center gap-1">
        <Text color="light" size="body3" weight="medium">
          {name}
        </Text>
        &middot;
        <Icon className="inline w-3.5" />
        <Text className="text-neutral-300" color="inherit" size="body3">
          {jobTitle}
        </Text>
      </div>
      {showContents && (
        <Text
          className="whitespace-normal text-neutral-300"
          color="inherit"
          size="body3">
          <TypingString characters={contents} interval={16} />
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
  if (!isShown) {
    return null;
  }

  return (
    <div
      className={clsx(
        'z-[1]',
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
        'select-none',
        className,
      )}>
      {children}
    </div>
  );
}

export default function InterviewsMarketingSolutionsByExInterviewersSection() {
  const intl = useIntl();
  const codeBlockRef = useRef(null);
  const showAnnotations = useInView(codeBlockRef, {
    amount: 'all',
    once: true,
  });

  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionSlug>('flatten');

  const subtitle = (
    <Text
      className={clsx(
        'block',
        'text-base lg:text-lg',
        'lg:font-medium',
        'max-w-[634px]',
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
  );

  return (
    <Container
      className={clsx('py-16 sm:py-20')}
      tag="section"
      width="marketing">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Example solutions"
          description="Marketing section title"
          id="2LfuaN"
        />
      </Heading>
      <Heading
        className={clsx(
          themeMarketingHeadingSize,
          themeGradientHeading,
          'max-w-xl pb-1',
        )}
        level="custom"
        tag="p"
        weight="medium">
        <FormattedMessage
          defaultMessage="Every question answered by ex-interviewers"
          description="Title for marketing page section"
          id="LMI4bA"
        />
      </Heading>
      <Section>
        <div className={clsx('mt-6', 'block lg:hidden')}>{subtitle}</div>
        <div
          className={clsx(
            'flex flex-col gap-6',
            'sm:grid sm:grid-cols-8 lg:grid-cols-12',
            'mt-12 lg:mt-16',
          )}>
          <div
            className={clsx(
              'flex flex-col gap-10',
              'col-span-2 lg:col-span-5',
            )}>
            <div className="hidden lg:block">{subtitle}</div>
            <div className="flex flex-col gap-6">
              <Text
                className={clsx('block', 'text-base md:text-lg', 'font-medium')}
                color="subtitle"
                size="inherit"
                weight="inherit">
                <FormattedMessage
                  defaultMessage="Example solutions"
                  description="Example code solutions"
                  id="egSWgk"
                />
              </Text>
              <div className="block sm:hidden">
                <TabsUnderline
                  alignment="stretch"
                  label={intl.formatMessage({
                    defaultMessage: 'Select navigation item',
                    description: 'Select navigation item label',
                    id: '94sK60',
                  })}
                  size="sm"
                  tabs={questions}
                  value={selectedQuestion}
                  onSelect={setSelectedQuestion}
                />
              </div>
              <div className="hidden sm:block">
                <SideNavigation
                  activeValue={selectedQuestion}
                  items={questions}
                  onClick={(value) => {
                    setSelectedQuestion(value);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            ref={codeBlockRef}
            className="prose col-span-6 text-sm lg:col-span-7">
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
                  renderLineContents={({ getTokenProps, line }) => {
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

                        const annotationData = getAnnotationData(
                          intl,
                          highlightId,
                        );

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
