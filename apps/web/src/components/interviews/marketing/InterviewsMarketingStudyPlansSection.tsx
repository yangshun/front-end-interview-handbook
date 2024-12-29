'use client';

import clsx from 'clsx';
import type { ForwardedRef, ReactNode } from 'react';
import { forwardRef, useRef } from 'react';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import AnimatedBeam from '~/components/ui/AnimatedBeam/AnimatedBeam';
import BorderBeam from '~/components/ui/BorderBeam/BorderBeam';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundColor,
  themeBorderBrandColor_Hover,
  themeBorderColor,
  themeBorderEmphasizeColor_Hover,
  themeGradientHeading,
  themeMarketingHeadingSize,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

export default function InterviewsMarketingStudyPlansSection() {
  return (
    <Container
      className={clsx('py-16 sm:py-20')}
      tag="section"
      width="marketing">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Study plans and topics"
          description="Marketing section title"
          id="HXZeeh"
        />
      </Heading>
      <Heading
        className={clsx(
          themeMarketingHeadingSize,
          themeGradientHeading,
          'pb-1 lg:max-w-2xl',
        )}
        level="custom"
        tag="p"
        weight="medium">
        <FormattedMessage
          defaultMessage="A simple yet comprehensive plan to follow"
          description="Title for marketing page study plans section"
          id="9kkbE6"
        />
      </Heading>
      <Section>
        <Text
          className={clsx(
            'mt-6 block',
            'text-base lg:text-lg',
            'lg:font-medium',
            'md:max-w-[634px]',
          )}
          color="secondary"
          size="inherit"
          weight="inherit">
          <FormattedMessage
            defaultMessage="Front end interviews are even broader in scope than traditional software engineering interviews. On top of the wide range of front end topics that could be asked, some companies still include standard DSA questions for front end roles."
            description="Subtitle for marketing page study plans section"
            id="94O2yv"
          />
        </Text>
        <Text
          className={clsx('mt-10 block max-w-xl text-lg', themeGradientHeading)}
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="We've condensed everything into a simple strategy you can use to conquer essential interview patterns."
            description="Subtitle for marketing page study plans section"
            id="IjqNaT"
          />
        </Text>
        <div
          className={clsx(
            'mt-12 lg:mt-16',
            'flex items-center justify-center',
          )}>
          <NodesNetwork />
        </div>
      </Section>
    </Container>
  );
}

function TopicNodeImpl(
  {
    children,
  }: Readonly<{
    children: ReactNode;
  }>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={clsx(
        'relative isolate z-[1]',
        'flex items-center justify-center',
        'p-2 md:px-2.5 md:py-1.5 lg:px-3.5 lg:py-2',
        ['text-xs lg:text-sm', 'font-medium', themeTextSubtitleColor],
        themeBackgroundColor,
        'transition-colors',
        [themeBorderColor, 'border', themeBorderEmphasizeColor_Hover],
        'rounded-lg',
      )}>
      {/* To hide the beam running running below for semi-transparent bgs */}
      <div
        className={clsx(
          'absolute inset-0 -z-[1] rounded-[inherit]',
          themeBackgroundCardColor,
        )}
      />
      {children}
    </div>
  );
}

const TopicNode = forwardRef(TopicNodeImpl);

function CenterNode({
  children,
  href,
  number,
}: Readonly<{
  children: ReactNode;
  href: string;
  number: number;
}>) {
  return (
    <Anchor
      className={clsx(
        'flex items-center gap-3',
        'px-3 py-2',
        'rounded-lg',
        'transition-colors',
        ['border', themeBorderColor, themeBorderBrandColor_Hover],
      )}
      href={href}
      variant="unstyled">
      <div
        className={clsx(
          'flex items-center justify-center',
          'size-6 rounded-full',
          ['border', themeBorderColor],
          themeBackgroundCardColor,
          ['text-xs lg:text-base', themeTextSubtleColor, 'font-medium'],
        )}>
        {number}
      </div>
      <div className={clsx('text-xs font-medium lg:text-base')}>{children}</div>
    </Anchor>
  );
}

function NodesNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const dsaRef = useRef<HTMLDivElement>(null);
  const jsFnRef = useRef<HTMLDivElement>(null);
  const a11yRef = useRef<HTMLDivElement>(null);
  const networkingRef = useRef<HTMLDivElement>(null);
  const reactRef = useRef<HTMLDivElement>(null);
  const fesdRef = useRef<HTMLDivElement>(null);
  const domManipulationRef = useRef<HTMLDivElement>(null);
  const i18nRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const perfRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'isolate',
        'relative flex h-fit w-[343px] items-center justify-center md:h-[380px] md:w-[720px] lg:h-[456px] lg:w-[1000px]',
        'lg:py-[42px]',
      )}>
      <div className="size-full flex flex-col items-center justify-center gap-10 overflow-hidden md:flex-row md:justify-between md:gap-0">
        <div
          className={clsx(
            'flex flex-wrap items-center justify-center gap-2',
            'md:h-full md:w-[240px] md:flex-col md:items-start md:justify-between md:gap-3',
          )}>
          <TopicNode ref={a11yRef}>
            <FormattedMessage
              defaultMessage="Accessibility"
              description="Front end topic"
              id="sx3TNQ"
            />
          </TopicNode>
          <TopicNode ref={jsFnRef}>
            <FormattedMessage
              defaultMessage="JavaScript Functions"
              description="Front end topic"
              id="RBV1s+"
            />
          </TopicNode>
          <TopicNode ref={reactRef}>React</TopicNode>
          <TopicNode ref={networkingRef}>
            <FormattedMessage
              defaultMessage="Networking"
              description="Front end topic"
              id="gjRrM6"
            />
          </TopicNode>
          <TopicNode ref={dsaRef}>
            <FormattedMessage
              defaultMessage="Data structures & algorithms"
              description="Front end topic"
              id="GXlJqk"
            />
          </TopicNode>
        </div>
        <div
          ref={centerRef}
          className={clsx(
            'flex flex-col gap-2',
            'relative z-[1]',
            'rounded-lg',
            'p-3 lg:p-4',
            themeBackgroundColor,
            ['border', themeBorderColor],
          )}>
          <CenterNode href="/interviews/gfe75" number={1}>
            GFE 75
          </CenterNode>
          <CenterNode href="/interviews/blind75" number={2}>
            Blind 75
          </CenterNode>
          <CenterNode href="/front-end-system-design-playbook" number={3}>
            <FormattedMessage
              defaultMessage="Front end system design"
              description="Front end topic"
              id="nYqpMP"
            />
          </CenterNode>
          <BorderBeam duration={5} />
        </div>
        <div
          className={clsx(
            'flex flex-wrap-reverse items-center justify-center gap-2',
            'md:h-full md:w-[240px] md:flex-col md:flex-nowrap md:items-end md:justify-between md:gap-3',
          )}>
          <TopicNode ref={fesdRef}>
            <FormattedMessage
              defaultMessage="Front end system design"
              description="Front end topic"
              id="nYqpMP"
            />
          </TopicNode>
          <TopicNode ref={domManipulationRef}>
            <FormattedMessage
              defaultMessage="DOM manipulation"
              description="Front end topic"
              id="WjyQOy"
            />
          </TopicNode>
          <TopicNode ref={i18nRef}>
            <FormattedMessage
              defaultMessage="Internationalization"
              description="Front end topic"
              id="ZYOMsS"
            />
          </TopicNode>
          <TopicNode ref={uiRef}>
            <FormattedMessage
              defaultMessage="User interfaces"
              description="Front end topic"
              id="gGg9If"
            />
          </TopicNode>
          <TopicNode ref={perfRef}>
            <FormattedMessage
              defaultMessage="Performance"
              description="Front end topic"
              id="JUHkm7"
            />
          </TopicNode>
        </div>
      </div>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dsaRef}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={jsFnRef}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={a11yRef}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={networkingRef}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={reactRef}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fesdRef}
        reverse={true}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={domManipulationRef}
        reverse={true}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={i18nRef}
        reverse={true}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={uiRef}
        reverse={true}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={perfRef}
        reverse={true}
        toRef={centerRef}
      />
    </div>
  );
}
