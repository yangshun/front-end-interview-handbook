import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiLinkedinBoxFill } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBorderColor,
  themeGradientHeading,
  themeTextFainterColor,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

function CardBorder({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className={clsx('relative', themeTextFainterColor)}>
      <svg
        className="absolute -top-1 left-1/2 -translate-x-1/2"
        fill="none"
        height="2"
        viewBox="0 0 728 2"
        width="728"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M728 1L0 1"
          stroke="url(#paint0_linear_1027_20046)"
          strokeDasharray="2 2"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1027_20046"
            x1="0.000153202"
            x2="718.586"
            y1="1"
            y2="0.99997">
            <stop stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="0.50131" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="absolute -bottom-1 left-1/2 -translate-x-1/2"
        fill="none"
        height="2"
        viewBox="0 0 728 2"
        width="728"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M728 1L0 1"
          stroke="url(#paint0_linear_1027_20047)"
          strokeDasharray="2 2"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1027_20047"
            x1="0.000153202"
            x2="718.586"
            y1="1"
            y2="0.99997">
            <stop stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="0.50131" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="absolute -left-1 top-1/2 -translate-y-2/3 sm:-translate-y-1/2"
        fill="none"
        viewBox="0 0 1 484"
        width="1"
        xmlns="http://www.w3.org/2000/svg">
        <line
          stroke="url(#paint0_linear_1027_20045)"
          strokeDasharray="2 2"
          x1="0.5"
          x2="0.499987"
          y1="2.16407e-08"
          y2="484"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1027_20045"
            x1="-0.5"
            x2="-0.500012"
            y1="-2.16407e-08"
            y2="484">
            <stop stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="absolute -right-1 top-1/2 -translate-y-2/3 sm:-translate-y-1/2"
        fill="none"
        height="484"
        viewBox="0 0 1 484"
        width="1"
        xmlns="http://www.w3.org/2000/svg">
        <line
          stroke="url(#paint0_linear_1027_20048)"
          strokeDasharray="2 2"
          x1="0.5"
          x2="0.499987"
          y1="2.16407e-08"
          y2="484"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1027_20048"
            x1="-0.5"
            x2="-0.500012"
            y1="-2.16407e-08"
            y2="484">
            <stop stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      {children}
    </div>
  );
}

export default function InterviewsMarketingForeword() {
  return (
    <Container
      className={clsx(
        'px-6',
        'py-16 sm:py-20',
        'flex flex-col items-center justify-center gap-12 lg:gap-16',
        'overflow-hidden',
      )}
      tag="section"
      width="marketing">
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Founder's foreword"
          description="Marketing section title"
          id="+1emCT"
        />
      </Heading>
      <Heading
        className={clsx(
          'max-w-xs text-center sm:max-w-2xl',
          '-tracking-1 text-3xl',
          themeGradientHeading,
        )}
        level="custom"
        tag="p"
        weight="medium">
        <FormattedMessage
          defaultMessage="We're crafting GreatFrontEnd with passion, precision and quality."
          description="Heading title for Yangshun foreword section"
          id="/g/6lA"
        />
      </Heading>
      <CardBorder>
        <div
          className={clsx(
            'isolate overflow-hidden',
            'flex flex-col gap-10',
            'max-w-[540px]',
            'p-8',
            'rounded-md',
            'bg-neutral-200/20 dark:bg-neutral-800/20',
            ['border', themeBorderColor],
            [
              themeWhiteGlowCardBackground,
              'before:-bottom-14 before:-right-14',
            ],
          )}>
          <blockquote
            className={textVariants({ size: 'body1', weight: 'medium' })}>
            <FormattedMessage
              defaultMessage='"Over my career, I have conducted over hundreds of interviews at Meta and have personally received offers from companies like Meta, Google, Airbnb, Lyft, Dropbox, Palantir, etc; I have probably seen all possible front end interview questions that can be asked.'
              description="Co-founder foreword"
              id="CSvCK2"
            />
            <br />
            <br />
            <FormattedMessage
              defaultMessage='GreatFrontEnd is the culmination of my experience and knowledge in the front end domain to help fellow engineers efficiently and adequately prepare for front end interviews. The best part of GreatFrontEnd is that all users emerge being better front end engineers after using the platform."'
              description="Co-founder foreword"
              id="NqMXNi"
            />
          </blockquote>
          <figcaption className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-2">
              <Anchor
                className={textVariants({ size: 'body1' })}
                href="https://linkedin.com/in/yangshun"
                variant="flat"
                weight="bold">
                Yangshun Tay{' '}
                <RiLinkedinBoxFill className="size-6 ml-0.5 inline -translate-y-0.5 align-middle" />
              </Anchor>
              <div className="flex flex-col gap-1">
                <Text color="secondary" size="body3" weight="medium">
                  <FormattedMessage
                    defaultMessage="Founder, CEO of GreatFrontEnd"
                    description="Position of Yangshun"
                    id="7YjBUE"
                  />
                </Text>
                <Text color="secondary" size="body3" weight="medium">
                  <FormattedMessage
                    defaultMessage="Ex-Staff Engineer, Meta. Author of Blind 75 and Docusaurus 2"
                    description="Position of Yangshun"
                    id="y2x1w7"
                  />
                </Text>
              </div>
            </div>
            <Avatar
              alt="Yangshun Tay's image"
              decoding="async"
              loading="lazy"
              size="2xl"
              src="/img/team/yangshun.jpg"
            />
          </figcaption>
        </div>
      </CardBorder>
    </Container>
  );
}
