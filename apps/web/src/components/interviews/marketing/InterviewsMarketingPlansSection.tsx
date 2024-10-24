'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import { FormattedMessage } from '~/components/intl';
import AnimatedBeam from '~/components/ui/AnimatedBeam/AnimateBeam';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundColor,
  themeBorderColor,
  themeGradientHeading,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

export default function InterviewsMarketingPlansSection() {
  return (
    <Container className={clsx('py-20')}>
      <Heading
        className={clsx(themeGradientHeading, 'max-w-2xl pb-1')}
        level="heading2"
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
            'max-w-md lg:max-w-2xl',
          )}
          color="secondary"
          size="inherit"
          weight="inherit">
          <FormattedMessage
            defaultMessage="Front end interviews are even broader in scope than traditional software engineering interviews. On top of the wide range of front-end topics that could be asked, some companies still include standard DSA questions for front-end roles."
            description="Subtitle for marketing page study plans section"
            id="B1eds8"
          />
        </Text>
        <Text
          className="mt-10 block max-w-xl text-base lg:text-lg"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="We've condensed everything info a simple strategy you can use to conquer essential interview patterns."
            description="Subtitle for marketing page study plans section"
            id="k9LkIB"
          />
        </Text>
        <div className="mt-16 flex items-center justify-center">
          <GraphNodes />
        </div>
      </Section>
    </Container>
  );
}

function TopicNode({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div
      className={clsx(
        'z-[1]',
        'flex items-center justify-center rounded-lg',
        'px-[8px] py-[4px] md:px-[10px] md:py-[6px] lg:px-[14px] lg:py-[8px]',
        ['text-xs lg:text-sm', 'font-medium', themeTextSubtitleColor],
        themeBackgroundCardColor,
        [themeBorderColor, 'border'],
      )}>
      {children}
    </div>
  );
}

function CenterNode({
  number,
  children,
}: Readonly<{
  children: ReactNode;
  number: number;
}>) {
  return (
    <div
      className={clsx(
        'flex items-center',
        'h-[33px] w-fit rounded-lg p-2 lg:h-[40px] lg:px-4',
        ['border', themeBorderColor],
      )}>
      <div
        className={clsx(
          'flex items-center justify-center',
          'mr-3 h-6 w-6 rounded-full',
          ['border', themeBorderColor],
          themeBackgroundCardColor,
          ['text-xs lg:text-base', themeTextSubtleColor],
          'font-medium',
        )}>
        {number}
      </div>
      <div className={clsx('text-xs font-medium lg:text-base')}>{children}</div>
    </div>
  );
}

function GraphNodes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);
  const div10Ref = useRef<HTMLDivElement>(null);
  const div11Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'isolate',
        'relative flex h-fit w-[343px] items-center justify-center md:h-[380px] md:w-[720px] lg:w-[1000px]',
      )}>
      <div className="size-full flex flex-col items-center justify-center gap-10 md:flex-row md:justify-between md:gap-0">
        <div className="flex h-[100px] flex-wrap items-center justify-center gap-2 md:h-full md:w-[240px] md:flex-col md:items-start md:justify-evenly md:gap-3">
          <div ref={div1Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>
              <FormattedMessage
                defaultMessage="Data structures & algorithms"
                description="Front end topic"
                id="GXlJqk"
              />
            </TopicNode>
          </div>
          <div ref={div2Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>
              <FormattedMessage
                defaultMessage="JavaScript Functions"
                description="Front end topic"
                id="RBV1s+"
              />
            </TopicNode>
          </div>
          <div ref={div3Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>
              <FormattedMessage
                defaultMessage="Accessibility"
                description="Front end topic"
                id="sx3TNQ"
              />
            </TopicNode>
          </div>
          <div ref={div4Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>
              <FormattedMessage
                defaultMessage="Networking"
                description="Front end topic"
                id="gjRrM6"
              />
            </TopicNode>
          </div>
          <div ref={div5Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>React</TopicNode>
          </div>
        </div>
        <div
          ref={div6Ref}
          className={clsx(
            'flex h-[146px] w-full flex-shrink-0 items-start justify-center md:h-[138px] md:w-[228px] md:items-center lg:h-[176px] lg:w-[293px]',
          )}>
          <div
            className={clsx(
              'relative z-[1] flex h-full w-fit flex-col items-start justify-center gap-2 rounded-lg border p-3',
              themeBackgroundColor,
              themeBorderColor,
            )}>
            <CenterNode number={1}>GFE 75</CenterNode>
            <CenterNode number={2}>Blind 75</CenterNode>
            <CenterNode number={3}>
              <FormattedMessage
                defaultMessage="Front end system design"
                description="Front end topic"
                id="nYqpMP"
              />
            </CenterNode>
          </div>
        </div>
        <div className="flex h-[100px] flex-wrap-reverse items-center justify-center gap-2 md:h-full md:w-[240px] md:flex-col md:flex-nowrap md:items-end md:justify-evenly md:gap-3">
          <div ref={div7Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>
              <FormattedMessage
                defaultMessage="Front end system design"
                description="Front end topic"
                id="nYqpMP"
              />
            </TopicNode>
          </div>
          <div ref={div8Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>
              <FormattedMessage
                defaultMessage="DOM manipulation"
                description="Front end topic"
                id="WjyQOy"
              />
            </TopicNode>
          </div>
          <div ref={div9Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>
              <FormattedMessage
                defaultMessage="Internationalization"
                description="Front end topic"
                id="ZYOMsS"
              />
            </TopicNode>
          </div>
          <div ref={div10Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>
              <FormattedMessage
                defaultMessage="User interfaces"
                description="Front end topic"
                id="gGg9If"
              />
            </TopicNode>
          </div>
          <div ref={div11Ref} className="flex h-6 justify-center md:h-7 lg:h-9">
            <TopicNode>
              <FormattedMessage
                defaultMessage="Performance"
                description="Front end topic"
                id="JUHkm7"
              />
            </TopicNode>
          </div>
        </div>
      </div>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        reverse={true}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div8Ref}
        reverse={true}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div9Ref}
        reverse={true}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div10Ref}
        reverse={true}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div11Ref}
        reverse={true}
        toRef={div6Ref}
      />
    </div>
  );
}
