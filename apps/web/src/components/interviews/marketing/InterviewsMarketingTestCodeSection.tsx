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
  themeDivideColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeTextColor,
  themeTextSubtitleColor,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';
import TestStatusIcon from '~/components/workspace/common/tests/TestStatusIcon';

function getCode(dynamicContent: string) {
  return `/**
 * @param {number} initialValue
 * @return {Function}
 */
export default function makeCounter(initialValue = 0) {
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
}: Readonly<{
  codeAnimationCompleted: boolean;
  codeBlockRef: RefObject<HTMLDivElement>;
}>) {
  const intl = useIntl();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [visibleTestCases, setVisibleTestCases] = useState<
    ReadonlyArray<TestCase>
  >([]);
  const [showTestCaseLines, setShowTestCaseLines] = useState(false);
  const cursorControls = useAnimation();

  // Show test cases lines by pushing test cases to the visibleTestCases array
  useEffect(() => {
    if (showTestCaseLines && visibleTestCases.length < testCases.length) {
      const timer = setTimeout(() => {
        setVisibleTestCases((prev) => [...prev, testCases[prev.length]]);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [showTestCaseLines, visibleTestCases.length]);

  useEffect(() => {
    function runAnimation() {
      if (buttonRef.current && codeBlockRef.current) {
        const containerRect = codeBlockRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();

        const centerX =
          buttonRect.left - containerRect.left + buttonRect.width / 2;
        const centerY =
          buttonRect.top - containerRect.top + buttonRect.height / 2;

        // Move cursor to button
        cursorControls
          .start({
            left: centerX,
            top: centerY,
            transition: { duration: 1 },
          })
          .then(() => {
            // Start the showing the test cases
            setShowTestCaseLines(true);
          });
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
        className={clsx('flex flex-col', 'w-full', [
          'divide-y',
          themeDivideColor,
        ])}
        // So that focus cannot go into the card, which is not meant to be used.
        {...{ inert: '' }}>
        {visibleTestCases.map(({ key, name, test }) => (
          <motion.div
            key={key}
            animate={{ opacity: 1 }}
            className={clsx('px-6 py-3', themeBackgroundColor)}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.1 }}>
            <Text className="flex items-center gap-3" size="body3">
              <TestStatusIcon status="pass" />{' '}
              <span className="font-mono text-xs">
                <span>{name}</span>
                <span> › </span>
                <span>{test}</span>
              </span>
            </Text>
          </motion.div>
        ))}
        <div className={clsx('flex justify-end gap-2', 'px-6 py-2.5')}>
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
            variant="secondary"
          />
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Submit',
              description: 'Label for submit button',
              id: 'K3opjL',
            })}
            size="xs"
            variant="primary"
          />
        </div>
      </div>
      <motion.div
        animate={cursorControls}
        className="absolute cursor-none"
        initial={{ bottom: '-50%', left: '30%' }}
        style={{ pointerEvents: 'none' }}>
        <RiCursorLine className={clsx('size-5 shrink-0', themeTextColor)} />
      </motion.div>
    </>
  );
}

export default function InterviewsMarketingTestCodeSection() {
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const showTestCode = useInView(codeBlockRef, {
    amount: 'all',
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

  const { value, start } = useTypingString(remainingCode, 30);
  const code = getCode(value);

  useEffect(() => {
    if (showTestCode) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTestCode]);

  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
        level="heading2"
        weight="medium">
        <FormattedMessage
          defaultMessage="Test your code automatically with a single click"
          description="Title for marketing page section"
          id="JV1NXV"
        />
      </Heading>
      <Section>
        <div className="mt-16 flex grid-cols-12 flex-col gap-6 lg:grid">
          <div className={clsx('col-span-5', 'flex flex-col gap-10')}>
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
                defaultMessage="Polish your answers with a comprehensive test suite that covers all the important edge cases that interviewers will look out for."
                description="Marketing page section subtitle"
                id="fr4Vl4"
              />
            </Text>
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
              'prose relative col-span-7 min-h-[463px] overflow-hidden text-sm',
            )}>
            <div
              className={clsx(
                'isolate',
                'code-block__marketing overflow-hidden rounded-xl',
                [
                  themeWhiteGlowCardBackground,
                  'before:-left-10 before:-top-24 before:z-[2]',
                ],
              )}>
              <div
                className={clsx(
                  '!absolute inset-0 top-0 z-[1] rounded-[inherit] before:m-[-1px]',
                  themeGlassyBorder,
                )}
              />
              <MDXCodeBlock showCopyButton={false}>{code}</MDXCodeBlock>
              <TestCaseAnimation
                codeAnimationCompleted={value.length === remainingCode.length}
                codeBlockRef={codeBlockRef}
              />
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
