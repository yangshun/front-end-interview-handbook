'use client';

import clsx from 'clsx';
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
            defaultMessage="We’ve condensed everything info a simple strategy you can use to conquer essential interview patterns."
            description="Subtitle for marketing page study plans section"
            id="oAPvOw"
          />
        </Text>
        <div className="mt-16 flex items-center justify-center">
          <DesktopAsset2 />
        </div>
      </Section>
    </Container>
  );
}

function DesktopAsset2() {
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
        'bg-background relative flex h-[420px] w-[343px] items-center justify-center md:h-[380px] md:w-[720px] lg:w-[1000px]',
      )}>
      <div className="size-full flex flex-col items-center justify-center md:flex-row md:justify-between">
        <div className="size-full relative md:h-full md:w-[220px]">
          <div
            ref={div1Ref}
            className="absolute left-0 top-0  flex justify-center  text-xs sm:top-[40px] md:left-0 md:text-sm">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              Data structures & algorithms
            </div>
          </div>
          <div
            ref={div2Ref}
            className="absolute left-[190px] top-0 flex justify-center  text-xs md:left-0 md:top-[105px] md:text-sm ">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              Javascript Functions
            </div>
          </div>
          <div
            ref={div3Ref}
            className="absolute left-[150px] top-[40px] flex justify-center text-xs md:left-0 md:top-[160px] md:text-sm">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              Accesibility
            </div>
          </div>
          <div
            ref={div4Ref}
            className="absolute left-[50] top-[40px] flex justify-center text-xs  md:left-0 md:top-[219px] md:text-sm">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              Networking
            </div>
          </div>
          <div
            ref={div5Ref}
            className="absolute left-[240px] top-[40px] flex justify-center text-xs md:left-0 md:top-[273px] md:text-sm">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              React
            </div>
          </div>
        </div>
        <div
          ref={div6Ref}
          className={clsx(
            'flex w-full justify-center md:flex md:h-full md:w-[300px] md:items-center md:justify-center',
          )}>
          <div
            className={clsx(
              'relative z-10 flex w-fit flex-col items-start justify-center rounded-lg border p-2',
              themeBackgroundColor,
              themeBorderColor,
            )}>
            {/* First item */}
            <div
              className={clsx(
                'mb-4 flex w-fit items-center rounded-lg border p-2',
                themeBorderColor,
              )}>
              <div
                className={clsx(
                  'mr-3 flex h-6 w-6 items-center justify-center rounded-full border',
                  themeBorderColor,
                  themeBackgroundCardColor,
                  themeTextSubtleColor,
                )}>
                1
              </div>
              <div>GFE 75</div>
            </div>

            {/* Second item */}
            <div
              className={clsx(
                'mb-4 flex w-fit flex-none items-center rounded-lg border p-2',
                themeBorderColor,
              )}>
              <div
                className={clsx(
                  'mr-3 flex h-6 w-6 items-center justify-center rounded-full border',
                  themeBorderColor,
                  themeBackgroundCardColor,
                  themeTextSubtleColor,
                )}>
                2
              </div>
              <span>Blind 75</span>
            </div>

            {/* Third item */}
            <div
              className={clsx(
                'flex w-fit flex-nowrap items-center rounded-lg border p-2',
                themeBorderColor,
              )}>
              <div
                className={clsx(
                  'mr-3 flex h-6 w-6 items-center justify-center rounded-full border',
                  themeBorderColor,
                  themeBackgroundCardColor,
                  themeTextSubtleColor,
                )}>
                3
              </div>
              <span>Front End System Design</span>
            </div>
          </div>
        </div>
        <div className="size-full relative md:h-full md:w-[200px]">
          <div
            ref={div7Ref}
            className=" absolute right-[170px] top-[80px] flex justify-center text-xs md:right-[10px] md:top-[40px] md:text-sm">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              Frontend system design
            </div>
          </div>
          <div
            ref={div8Ref}
            className="absolute right-[40px] top-[80px] flex justify-center text-xs md:right-[10px] md:top-[105px] md:text-sm">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              DOM manipulation
            </div>
          </div>
          <div
            ref={div9Ref}
            className="absolute right-[90px] top-[40px] flex justify-center text-xs md:right-[10px] md:top-[160px] md:text-sm">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              Internationalization
            </div>
          </div>
          <div
            ref={div10Ref}
            className="absolute right-[220px] top-[40px] flex justify-center text-xs md:right-[10px]  md:top-[219px] md:text-sm">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              User interfaces
            </div>
          </div>
          <div
            ref={div11Ref}
            className="absolute right-0 top-[40px] flex justify-center text-xs md:right-[10px] md:top-[273px] md:text-sm">
            <div
              className={clsx(
                'z-10 flex items-center justify-center rounded-lg border px-2 py-1',
                themeTextSubtitleColor,
                themeBackgroundCardColor,
                themeBorderColor,
              )}>
              Peformance
            </div>
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
