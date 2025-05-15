import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Chip from '~/components/ui/Chip';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';
import { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor,
  themeBorderColor,
  themeRadialGlowBackground,
} from '~/components/ui/theme';

type HowItWorksStep = {
  imgSrc: string;
  key: string;
  label: string;
};

function useSteps(): Array<HowItWorksStep> {
  const intl = useIntl();

  return [
    {
      imgSrc: '/img/marketing/projects/how-it-works-step-1.webp',
      key: 'choose-project',
      label: intl.formatMessage({
        defaultMessage: 'Choose and start a project',
        description:
          'Step 1 of the "How it works" section on the Projects home page',
        id: 'knzfbW',
      }),
    },
    {
      imgSrc: '/img/marketing/projects/how-it-works-step-2.webp',
      key: 'assets',
      label: intl.formatMessage({
        defaultMessage:
          "We'll provide all the assets that you need - starter code, professional design, API specs, etc.",
        description:
          'Step 2 of the "How it works" section on the Projects home page',
        id: '6e8XrP',
      }),
    },
    {
      imgSrc: '/img/marketing/projects/how-it-works-step-3.webp',
      key: 'build-project',
      label: intl.formatMessage({
        defaultMessage:
          "Build the project guided by us - refer to official guides, solutions, reference other user's submissions, and discuss with the community",
        description:
          'Step 3 of the "How it works" section on the Projects home page',
        id: '6Qxjzw',
      }),
    },
    {
      imgSrc: 'img/marketing/projects/how-it-works-step-4.svg',
      key: 'submit-project',
      label: intl.formatMessage({
        defaultMessage:
          'Submit your project - host your project on any service and submit your Github repo and site url',
        description:
          'Step 4 of the "How it works" section on the Projects home page',
        id: 'k8wyWA',
      }),
    },
    {
      imgSrc: '/img/marketing/projects/how-it-works-step-5.webp',
      key: 'feedback',
      label: intl.formatMessage({
        defaultMessage: 'Get feedback and code reviews from the community',
        description:
          'Step 5 of the "How it works" section on the Projects home page',
        id: 'BI4wLY',
      }),
    },
  ];
}

function HowItWorksStepContainer({
  children,
  className,
  onClick,
  onHover,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onHover?: () => void;
}) {
  const canClick = !!onClick;
  const canHover = !!onHover;

  if (canClick || canHover) {
    return (
      <button
        className={className}
        type="button"
        onClick={onClick}
        onMouseOver={onHover}>
        {children}
      </button>
    );
  }

  return <div className={className}>{children}</div>;
}

function HowItWorksStep({
  label,
  index,
  selected,
  onClick,
  onHover,
}: {
  index: number;
  label: string;
  onClick?: () => void;
  onHover?: () => void;
  selected?: boolean;
}) {
  return (
    <HowItWorksStepContainer
      className={clsx(
        'flex items-center gap-4 rounded px-3 py-4 transition',
        selected && ['text-brand', themeBackgroundElementEmphasizedStateColor],
      )}
      onClick={onClick}
      onHover={onHover}>
      <Chip
        aria-hidden={true}
        className="transition"
        label={(index + 1).toString()}
        variant={selected ? 'active' : 'neutral'}
      />
      <span
        className={clsx(
          'text-start',
          textVariants({ color: 'inherit', size: 'body1', weight: 'medium' }),
        )}>
        {label}
      </span>
    </HowItWorksStepContainer>
  );
}

function CardStackCard({
  className,
  children,
  shadow,
}: {
  children?: React.ReactNode;
  className?: string;
  shadow?: boolean;
}) {
  return (
    <div className={clsx('absolute top-0 size-full', className)}>
      <div
        className={clsx(
          'relative size-full overflow-clip rounded-lg border',
          themeBorderColor,
          themeBackgroundElementColor,
        )}
        style={
          shadow
            ? {
                boxShadow: '0px -6px 12px 0px rgba(0, 0, 0, 0.3)',
              }
            : undefined
        }>
        {children}
      </div>
    </div>
  );
}

function CardStack({
  children,
  size,
}: {
  children?: React.ReactNode;
  size: 'lg' | 'sm';
}) {
  return (
    <div
      className={clsx(
        'relative flex h-[241px] w-auto shrink-0 items-stretch md:h-[340px] md:w-[446px]',
        size === 'lg' && 'mb-10',
        size === 'sm' && 'mb-6',
      )}>
      {/* Back card */}
      <CardStackCard
        className={clsx(
          size === 'lg' && '-translate-y-10 p-12',
          size === 'sm' && '-translate-y-6 p-6',
        )}
      />
      {/* Middle card */}
      <CardStackCard
        className={clsx(size === 'lg' && 'p-6', size === 'sm' && 'p-3')}
        shadow={true}
      />
      {/* Front card */}
      <CardStackCard
        className={clsx(
          size === 'lg' && 'translate-y-10',
          size === 'sm' && 'translate-y-6',
        )}
        shadow={true}>
        {children}
      </CardStackCard>
    </div>
  );
}

export default function ProjectsMarketingHowItWorks() {
  const steps = useSteps();
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  return (
    <div
      className={clsx(
        'isolate rounded-t-3xl lg:mx-8 lg:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-14 py-16 lg:gap-y-32 lg:py-32">
        <div className="mx-auto md:max-w-screen-sm lg:max-w-4xl">
          <MarketingSectionHeader
            heading={
              <FormattedMessage
                defaultMessage="How it works"
                description="Heading of the 'How it works' marketing section on Projects home page"
                id="6pmA7h"
              />
            }
          />
        </div>
        <Section>
          <div className="hidden gap-[72px] lg:flex">
            <ol className="flex flex-col items-stretch gap-y-3">
              {steps.map((step, index) => (
                <li key={step.key} className="contents">
                  <HowItWorksStep
                    index={index}
                    label={step.label}
                    selected={selectedStepIndex === index}
                    onClick={() => setSelectedStepIndex(index)}
                    onHover={() => setSelectedStepIndex(index)}
                  />
                </li>
              ))}
            </ol>
            <CardStack size="lg">
              <Image alt="" fill={true} src={steps[selectedStepIndex].imgSrc} />
            </CardStack>
          </div>
          <div className="flex gap-[72px] lg:hidden">
            <ol className="relative flex flex-col items-stretch gap-y-12">
              {steps.map((step, index) => (
                <li key={step.key} className={clsx('relative flex flex-col')}>
                  {index !== steps.length - 1 && (
                    <div className="absolute -bottom-[88px] start-4 top-4 border-s border-dashed border-neutral-400 dark:border-neutral-600"></div>
                  )}
                  <div className="-mx-3">
                    <HowItWorksStep index={index} label={step.label} />
                  </div>
                  <div className="mt-2 ps-12">
                    <CardStack size="sm">
                      <Image alt="" fill={true} src={step.imgSrc} />
                    </CardStack>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      </Container>
    </div>
  );
}
