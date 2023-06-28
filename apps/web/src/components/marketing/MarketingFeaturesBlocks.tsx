import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import MarketingFeatureSolutions from '~/components/marketing/MarketingFeatureSolutions';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeRadialGlowBackground,
  themeTextBrandColor,
} from '~/components/ui/theme';

import MarketingSectionHeader from './MarketingSectionHeader';
import type { QuestionUserInterfaceBundle } from '../questions/common/QuestionsTypes';

function FeatureBlock({
  description,
  features,
  media,
  reverse = false,
  title,
}: Readonly<{
  description?: ReactNode;
  features: ReadonlyArray<ReactNode>;
  media: ReactNode;
  reverse?: boolean;
  title: ReactNode;
}>) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-x-20 gap-y-6 md:items-center lg:gap-x-28',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      )}>
      <div className="md:basis-1/2 overflow-auto">{media}</div>
      <div className="md:basis-1/2 mx-auto flex max-w-sm flex-col gap-y-4 md:max-w-none">
        <Heading level="heading4">{title}</Heading>
        {description && (
          <Text color="secondary" display="block">
            {description}
          </Text>
        )}
        <ul className="flex flex-col gap-y-1" role="list">
          {features.map((feature, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="flex gap-x-1">
              <RiCheckLine
                aria-hidden={true}
                className={clsx('mt-0.5 h-5 w-5 shrink-0', themeTextBrandColor)}
              />
              <Text color="secondary" display="block">
                {feature}
              </Text>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function MarketingFeaturesBlocks({
  solutions,
}: Readonly<{
  solutions: Readonly<{
    todoListReact: QuestionUserInterfaceBundle;
    todoListVanilla: QuestionUserInterfaceBundle;
  }>;
}>) {
  return (
    <div
      className={clsx(
        'lg:rounded-t-[48px] lg:mx-8',
        themeRadialGlowBackground,
      )}>
      <Container className="flex flex-col gap-y-16 py-32">
        <div className="mx-auto md:max-w-screen-sm lg:max-w-4xl">
          <MarketingSectionHeader
            description={
              <FormattedMessage
                defaultMessage="You won't find the same depth or quality elsewhere."
                description="Subtitle of the 'Features' marketing section on Homepage"
                id="ft4ubO"
              />
            }
            heading={
              <FormattedMessage
                defaultMessage="Everything you need, in great quality"
                description="Title of the 'Features' marketing section on Homepage"
                id="d+9jeS"
              />
            }
            title={
              <FormattedMessage
                defaultMessage="Features"
                description="Title of the 'Features' marketing section on Homepage"
                id="yXYc5a"
              />
            }
          />
        </div>
        <FeatureBlock
          description={
            <>
              We structured the monolith of front end interview preparation into
              bite-sized focus areas. Explore learning paths and find what you
              need.
            </>
          }
          features={[
            <>Cover everything important</>,
            <>Track your progress</>,
            <>Pick and choose weak areas</>,
          ]}
          media={
            <img
              alt="Question topics"
              className="mx-auto max-w-sm md:max-w-full"
              src="/img/marketing/topics.svg"
            />
          }
          title={<>Not sure what to prepare? No problem</>}
        />
        <FeatureBlock
          features={[
            <>
              Every interview format - System design, UI, JavaScript, Quizzes
            </>,
            <>
              Solutions with explanations in popular frameworks – React,
              Angular, Svelte (coming soon)
            </>,
          ]}
          media={
            <img
              alt="Questions for many frameworks"
              className="mx-auto w-full max-w-sm md:max-w-none"
              src="/img/marketing/questions-framework.png"
            />
          }
          reverse={true}
          title={<>Practice 200+ of the most important questions</>}
        />
        <FeatureBlock
          features={[
            <>
              Large number of practical considerations like accessibility and UI
              UX
            </>,
            <>Concepts to reinforce fundamentals</>,
            <>Technique tips and design patterns</>,
          ]}
          media={<MarketingFeatureSolutions solutions={solutions} />}
          title={<>Learn from solutions by ex-interviewers</>}
        />
        <FeatureBlock
          features={[
            <>State-of-the-art workspace</>,
            <>No set-up needed</>,
            <>Syntax highlighting, themes, keyboard shortcuts, and more</>,
          ]}
          media={
            <img
              alt="Solutions from ex-interviewers"
              className="mx-auto w-full max-w-sm md:max-w-none"
              src="/img/marketing/workspace.png"
            />
          }
          reverse={true}
          title={<>Get started instantly</>}
        />
        <FeatureBlock
          features={[
            <>Automated comprehensive test cases for JavaScript questions</>,
            <>Detailed test case scenarios for UI questions</>,
          ]}
          media={
            <img
              alt="Coding workspace"
              className="mx-auto w-full max-w-sm md:max-w-none"
              src="/img/marketing/tests.png"
            />
          }
          title={<>Comprehensive test cases</>}
        />
        <FeatureBlock
          features={[
            <>Company-tagged questions for over 15 major tech companies</>,
          ]}
          media={
            <img
              alt="Coding workspace"
              className="mx-auto w-full max-w-sm md:max-w-none"
              src="/img/marketing/questions-company.png"
            />
          }
          reverse={true}
          title={<>Find questions asked by your dream company</>}
        />
        <FeatureBlock
          features={[
            <>Tailored to experience level</>,
            <>
              Customize preparation timelines based on time left and hours to
              prepare per day
            </>,
          ]}
          media={
            <img
              alt="Coding workspace"
              className="mx-auto w-full max-w-sm md:max-w-none"
              src="/img/marketing/study-plans.png"
            />
          }
          title={<>Use proven study plans</>}
        />
      </Container>
    </div>
  );
}
