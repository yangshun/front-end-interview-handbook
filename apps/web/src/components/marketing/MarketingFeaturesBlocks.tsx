import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeGradient1,
  themeGradient2,
  themeGradient3,
  themeTextBrandColor,
} from '~/components/ui/theme';

import MarketingSectionHeader from './MarketingSectionHeader';

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
        'flex flex-col gap-x-28 gap-y-8 md:items-center',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      )}>
      <div className="md:basis-1/2">{media}</div>
      <div className="flex flex-col gap-y-4 md:basis-1/2">
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

export default function MarketingFeaturesBlocks() {
  return (
    <div>
      <Container className="flex flex-col gap-y-12 py-8 md:gap-y-24 lg:gap-y-32">
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
            <div
              className={clsx(
                'h-72 w-full rounded-lg',
                themeGradient1.className,
              )}
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
            <div
              className={clsx(
                'h-96 w-full rounded-lg',
                themeGradient2.className,
              )}
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
          media={
            <div
              className={clsx(
                'h-64 w-full rounded-lg',
                themeGradient3.className,
              )}
            />
          }
          title={<>Learn from solutions by ex-interviewers</>}
        />
        <FeatureBlock
          features={[
            <>State-of-the-art workspace</>,
            <>No set-up needed</>,
            <>Syntax highlighting, themes, keyboard shortcuts, and more</>,
          ]}
          media={
            <div
              className={clsx(
                'h-80 w-full rounded-lg',
                themeGradient1.className,
              )}
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
            <div
              className={clsx(
                'h-72 w-full rounded-lg',
                themeGradient2.className,
              )}
            />
          }
          title={<>Comprehensive test cases</>}
        />
        <FeatureBlock
          features={[
            <>Company-tagged questions for over 15 major tech companies</>,
          ]}
          media={
            <div
              className={clsx(
                'h-64 w-full rounded-lg',
                themeGradient3.className,
              )}
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
            <div
              className={clsx(
                'h-96 w-full rounded-lg',
                themeGradient3.className,
              )}
            />
          }
          title={<>Use proven study plans</>}
        />
      </Container>
    </div>
  );
}
