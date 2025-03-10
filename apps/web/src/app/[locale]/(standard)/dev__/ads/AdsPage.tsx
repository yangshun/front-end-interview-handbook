'use client';

import QuestionsProgressPanel from '~/components/interviews/questions/listings/stats/QuestionsProgressPanel';
import QuestionDifficultyLabel from '~/components/interviews/questions/metadata/QuestionDifficultyLabel';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import UIExamplesGroup from '~/components/ui/misc/UIExamplesGroup';
import {
  themeGradientGreenYellow,
  themeGradientPinkPurple,
  themeGradientPurpleGreen,
} from '~/components/ui/theme';
import {
  SponsorsAdsSpotsProjectsInContent,
  SponsorsAdsSpotsProjectsSpotlight,
} from '~/data/ads/SponsorsAdsSpotsProjects';
import SponsorsAdFormatSpotlight from '~/components/sponsors/ads/SponsorsAdFormatSpotlight';
import SponsorsAdFormatSpotlightCard from '~/components/sponsors/ads/SponsorsAdFormatSpotlightCard';
import { SponsorsAdFormatPayloadSpotlight } from '~/components/sponsors/SponsorsTypes';
import {
  SponsorsAdsSpotsSwagOverflowInContent,
  SponsorsAdsSpotsSwagOverflowInContentUndefinedIsNotAFunction,
  SponsorsAdsSpotsSwagOverflowSpotlight,
} from '~/data/ads/SponsorsAdsSpotsSwagOverflow';
import SponsorsAdFormatInContent from '~/components/sponsors/ads/SponsorsAdFormatInContent';
import clsx from 'clsx';

function SpotlightAd({
  ad,
}: Readonly<{ ad: SponsorsAdFormatPayloadSpotlight }>) {
  return (
    <div className="flex flex-col gap-6">
      <SponsorsAdFormatSpotlight
        adPlacement={'preview'}
        tracking={false}
        {...ad}
      />
      <SponsorsAdFormatSpotlightCard
        adPlacement={'preview'}
        tracking={false}
        {...ad}
      />
    </div>
  );
}

export default function AdsPage() {
  return (
    <div className="flex flex-col gap-y-16">
      <Container className="flex flex-col gap-y-4">
        <Heading level="heading2">Ads</Heading>
        <Divider />
      </Container>
      <Section>
        <Container className="flex flex-col gap-y-4">
          <Heading level="heading3">Spotlight</Heading>
          <Section>
            <UIExamplesGroup darkMode="horizontal">
              <div className={clsx('flex flex-col gap-16', 'max-w-md')}>
                <SpotlightAd ad={SponsorsAdsSpotsProjectsSpotlight} />
                <SpotlightAd ad={SponsorsAdsSpotsSwagOverflowSpotlight} />
              </div>
            </UIExamplesGroup>
          </Section>
        </Container>
        <Container className="flex flex-col gap-y-4">
          <Heading level="heading3">In-content</Heading>
          <Section>
            <UIExamplesGroup darkMode="horizontal">
              <div className={clsx('flex flex-col gap-16', 'max-w-md')}>
                {[
                  SponsorsAdsSpotsProjectsInContent,
                  SponsorsAdsSpotsSwagOverflowInContent,
                  SponsorsAdsSpotsSwagOverflowInContentUndefinedIsNotAFunction,
                ].map((ad) => (
                  <SponsorsAdFormatInContent
                    size={'md'}
                    key={ad.adId}
                    adPlacement={'preview'}
                    tracking={false}
                    {...ad}
                  />
                ))}
              </div>
            </UIExamplesGroup>
          </Section>
        </Container>
      </Section>
    </div>
  );
}
