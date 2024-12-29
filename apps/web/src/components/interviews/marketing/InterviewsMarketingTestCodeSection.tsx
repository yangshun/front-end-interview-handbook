import clsx from 'clsx';
import { motion, useAnimation, useInView } from 'framer-motion';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { RiCheckboxCircleLine, RiCursorLine, RiPlayLine } from 'react-icons/ri';

import useTypingString from '~/hooks/useTypingString';

import { FormattedMessage, useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundInvertColor,
  themeDivideColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeMarketingHeadingSize,
  themeTextColor,
  themeTextSubtitleColor,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';
import TestStatusIcon from '~/components/workspace/common/tests/TestStatusIcon';

function getCode(dynamicContent: string) {
  return `export default function makeCounter(initialValue = 0) {
  let count = ${dynamicContent}
`;
}

const remainingCode = `initialValue - 1;

  return () => {
    count += 1;
    return count;
  };
}`;

type TestCase = Readonly<{
  key: string;
  name: string;
  test: string;
}>;

const testCases: ReadonlyArray<TestCase> = [
  {
    key: 'function',
    name: 'makeCounter',
    test: 'returns a function',
  },
  {
    key: 'value',
    name: 'makeCounter',
    test: 'return default value',
  },
  {
    key: 'increments',
    name: 'makeCounter',
    test: 'increments',
  },
];

function TestCaseAnimation({
  codeAnimationCompleted,
  codeBlockRef,
  startTypingAnimation,
}: Readonly<{
  codeAnimationCompleted: boolean;
  codeBlockRef: RefObject<HTMLDivElement>;
  startTypingAnimation: () => void;
}>) {
  const intl = useIntl();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [visibleTestCases, setVisibleTestCases] = useState<
    ReadonlyArray<TestCase>
  >([]);
  const [showTestCaseLines, setShowTestCaseLines] = useState(false);
  const cursorControls = useAnimation();
  const rippleControls = useAnimation();

  // Show test cases lines by pushing test cases to the visibleTestCases array
  useEffect(() => {
    if (showTestCaseLines && visibleTestCases.length < testCases.length) {
      const timer = setTimeout(() => {
        setVisibleTestCases((prev) => [...prev, testCases[prev.length]]);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [showTestCaseLines, visibleTestCases.length]);

  function rerunAnimation() {
    startTypingAnimation();
    setShowTestCaseLines(false);
    setVisibleTestCases([]);
    cursorControls.start({
      left: 60,
      opacity: 0,
      top: 200,
      transition: { duration: 0 },
    });
    rippleControls.start({
      scale: 0,
    });
  }

  useEffect(() => {
    async function runAnimation() {
      cursorControls.start({
        left: 60,
        opacity: 0,
        transition: { duration: 0 },
      });
      if (buttonRef.current && codeBlockRef.current) {
        const containerRect = codeBlockRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();

        const centerX =
          buttonRect.left - containerRect.left + buttonRect.width / 2;
        const centerY =
          buttonRect.top - containerRect.top + buttonRect.height / 2;

        // Show cursor
        cursorControls.start({
          opacity: 1,
          transition: { duration: 0 },
        });
        // Move cursor to button
        await cursorControls.start({
          left: centerX,
          top: centerY,
          transition: { duration: 0.7 },
        });
        // Show ripple effect around the cursor
        await rippleControls.start({
          scale: 1,
          transition: { duration: 0.3 },
        });
        // Hide the cursor after the ripple effect
        cursorControls.start({
          opacity: 0,
          transition: { duration: 0.1 },
        });
        // Start the showing the test cases
        setShowTestCaseLines(true);
      }
    }
    if (codeAnimationCompleted) {
      runAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeAnimationCompleted]);

  return (
    <>
      <div
        className={clsx(
          'flex flex-col',
          'w-full p-0.5 pt-0',
          'relative z-[1]',
          ['divide-y', themeDivideColor],
        )}>
        {visibleTestCases.map(({ key, name, test }) => (
          <motion.div
            key={key}
            animate={{ opacity: 1 }}
            className={clsx('px-6 py-3', themeBackgroundColor)}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.1 }}>
            <Text className="flex items-center gap-2" size="body2">
              <TestStatusIcon status="pass" />{' '}
              <span className="font-mono text-xs">
                <span>{name}</span>
                <span> › </span>
                <span>{test}</span>
              </span>
            </Text>
          </motion.div>
        ))}
        <div className={clsx('flex justify-end', 'px-6 py-2.5')}>
          <Button
            ref={buttonRef}
            addonPosition="start"
            icon={RiPlayLine}
            label={intl.formatMessage({
              defaultMessage: 'Run',
              description: 'Label for run button',
              id: '0SrfG9',
            })}
            size="xs"
            variant="primary"
            onClick={rerunAnimation}
          />
        </div>
      </div>
      <motion.div
        animate={cursorControls}
        className="size-8 absolute cursor-none"
        initial={{ left: 60, opacity: 0, top: 200 }}
        style={{ pointerEvents: 'none' }}>
        <RiCursorLine
          className={clsx('size-5 relative z-[3] shrink-0', themeTextColor)}
        />
        <motion.div
          animate={rippleControls}
          className={clsx(
            'absolute -left-2 -top-3',
            'rounded-full',
            themeBackgroundInvertColor,
            'opacity-40',
            'size-8',
            'z-[3]',
          )}
          initial={{ scale: 0 }}
        />
      </motion.div>
    </>
  );
}

export default function InterviewsMarketingTestCodeSection() {
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const showTestCode = useInView(codeBlockRef, {
    amount: 0.3,
    once: true,
  });
  const features = [
    {
      key: 'test-code-feature1',
      label: (
        <FormattedMessage
          defaultMessage="Fully public and customizable"
          description="Features for test code section of homepage"
          id="QENy25"
        />
      ),
    },
    {
      key: 'test-code-feature2',
      label: (
        <FormattedMessage
          defaultMessage="Detailed test scenarios for UI questions"
          description="Features for test code section of homepage"
          id="fy7XZW"
        />
      ),
    },
  ];

  const { value, start } = useTypingString(remainingCode, 20);
  const code = getCode(value);

  useEffect(() => {
    if (showTestCode) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTestCode]);

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
        defaultMessage="Polish your answers with a comprehensive test suite that covers all the important edge cases that interviewers will look out for."
        description="Marketing page section subtitle"
        id="fr4Vl4"
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
          defaultMessage="Automated convenenient testing"
          description="Marketing section title"
          id="SRaazR"
        />
      </Heading>
      <Heading
        className={clsx(
          themeMarketingHeadingSize,
          themeGradientHeading,
          'max-w-2xl pb-1',
        )}
        level="custom"
        tag="p"
        weight="medium">
        <FormattedMessage
          defaultMessage="Test your code automatically with a single click"
          description="Title for marketing page section"
          id="JV1NXV"
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
              'col-span-2 lg:col-span-5',
              'flex flex-col gap-10',
            )}>
            <div className={clsx('hidden lg:block')}>{subtitle}</div>
            <ol className="flex flex-col gap-3">
              {features.map(({ key, label }) => (
                <li key={key} className="flex items-center gap-3">
                  <RiCheckboxCircleLine
                    aria-hidden={true}
                    className={clsx('size-5 shrink-0', themeTextSubtitleColor)}
                  />
                  <Text color="secondary" size="body2" weight="medium">
                    {label}
                  </Text>
                </li>
              ))}
            </ol>
          </div>
          <div
            ref={codeBlockRef}
            className={clsx(
              'prose relative',
              'min-h-[385px]',
              'text-sm',
              'overflow-hidden',
              'col-span-6 lg:col-span-7',
            )}>
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
              <div className="z-[2] m-0.5 overflow-hidden rounded-t-[inherit]">
                <MDXCodeBlock showCopyButton={false} showLineNumbers={true}>
                  {code}
                </MDXCodeBlock>
              </div>
              <TestCaseAnimation
                codeAnimationCompleted={value.length === remainingCode.length}
                codeBlockRef={codeBlockRef}
                startTypingAnimation={start}
              />
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
