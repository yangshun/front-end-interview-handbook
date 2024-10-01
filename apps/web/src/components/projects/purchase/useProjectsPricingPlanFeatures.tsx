import { FormattedMessage, useIntl } from '~/components/intl';

import type {
  ProjectsSubscriptionPlanFeatureName,
  ProjectsSubscriptionPlanFeatures,
} from './ProjectsPricingFeaturesConfig';
import type { ProjectsSubscriptionPlanIncludingFree } from './ProjectsPricingPlans';

export type ProjectsSubscriptionPlanFeature = Readonly<{
  description?: React.ReactNode;
  plan?: Partial<Record<ProjectsSubscriptionPlanIncludingFree, string>>;
  title: string;
}>;

export default function useProjectsPricingPlanFeatures(
  plans: Record<
    ProjectsSubscriptionPlanIncludingFree,
    ProjectsSubscriptionPlanFeatures
  >,
) {
  const { MONTH: monthPlan } = plans;
  const intl = useIntl();

  const features: Record<
    ProjectsSubscriptionPlanFeatureName,
    ProjectsSubscriptionPlanFeature
  > = {
    apps: {
      title: intl.formatMessage({
        defaultMessage: 'Multi-page & fully-functional apps',
        description: 'Label for apps feature',
        id: 'PLPXbS',
      }),
    },
    breakpoints: {
      title: intl.formatMessage({
        defaultMessage: 'Professional designs in 3 breakpoints',
        description: 'Label for breakpoints feature',
        id: 'bFDEGM',
      }),
    },
    componentTracks: {
      description: (
        <div className="flex flex-col">
          <FormattedMessage
            defaultMessage="Component tracks are collections of components which make up component libraries for specific practical use cases e.g. Marketing, E-Commerce, or even design systems. Building component tracks can leave a strong impression on potential employers and recruiters, showcasing your expertise and versatility in building a variety of components for common use cases, which is much more impressive than building individual projects."
            description="Description for component tracks feature"
            id="Qg2LjE"
          />
        </div>
      ),
      plan: {
        ANNUAL: intl.formatMessage({
          defaultMessage: 'All tracks',
          description: 'Label for component tracks feature for pricing plan',
          id: 'yCyxT4',
        }),
        FREE: intl.formatMessage({
          defaultMessage: 'Only Marketing track',
          description: 'Label for component tracks feature for pricing plan',
          id: 'F+4T7/',
        }),
        MONTH: intl.formatMessage({
          defaultMessage: 'All tracks',
          description: 'Label for component tracks feature for pricing plan',
          id: 'yCyxT4',
        }),
      },
      title: intl.formatMessage({
        defaultMessage: 'Access to Component Tracks',
        description: 'Label for component tracks feature',
        id: '3QliNF',
      }),
    },
    credits: {
      description: (
        <div className="flex flex-col gap-y-2">
          <p>
            <FormattedMessage
              defaultMessage="Upon purchasing premium, you will be given a number of premium credits. A premium credit gives you access to all premium features in a free project (Figma files, official solutions & guides from senior engineers), or can unlock a premium challenge."
              description="Description of premium feature"
              id="uAAJxp"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="Even when you are not actively subscribed, unspent premium credits will roll over to the next cycle. For annual users, we will roll over credits for projects that remain locked at the end of your subscription cycle. However, credits can only be spent when you are an active premium member."
              description="Description of premium feature"
              id="xleg5b"
            />
          </p>
        </div>
      ),
      plan: {
        ANNUAL: intl.formatMessage({
          defaultMessage: 'Unlimited premium credits',
          description: 'Label for unlocks feature for annual plan',
          id: 'V6uY86',
        }),
        MONTH: intl.formatMessage(
          {
            defaultMessage: '{count} premium credits every month',
            description: 'Label for unlocks feature for month plan',
            id: 'HBTTrj',
          },
          {
            count: monthPlan.credits,
          },
        ),
      },
      title: intl.formatMessage({
        defaultMessage:
          'Unlock premium challenges and premium features on free challenges',
        description: 'Label for unlocks feature',
        id: 'l5U3bQ',
      }),
    },
    freeChallenges: {
      title: intl.formatMessage({
        defaultMessage: 'Free project challenges',
        description: 'Label for free challenges feature',
        id: 'PDz3Oi',
      }),
    },
    skillRoadmap: {
      description: (
        <div className="flex flex-col gap-y-2">
          <p>
            <FormattedMessage
              defaultMessage="We provide a roadmap of all the core skills needed to be a great front end engineer, from beginner to advanced. For each skill, we suggest good resources for you to study and projects you can build on our platform to learn the skill. This roadmap is curated by senior engineers with extensive experience in the industry, ensuring the quality and trustworthiness of the content."
              description="Description for skill roadmap feature"
              id="RWWOGp"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="Additionally, we offer a gamified progress tracking system to monitor your proficiency in applying these skills across our projects."
              description="Description for skill roadmap feature"
              id="/kvO93"
            />
          </p>
        </div>
      ),
      plan: {
        ANNUAL: intl.formatMessage({
          defaultMessage: 'From beginner to advanced',
          description: 'Label for skill roadmap feature for annual plan',
          id: 'J1pqvo',
        }),
        FREE: intl.formatMessage({
          defaultMessage: 'Only foundational skills',
          description: 'Label for skill roadmap feature for month plan',
          id: 'MZyEk9',
        }),
        MONTH: intl.formatMessage({
          defaultMessage: 'From beginner to advanced',
          description: 'Label for skill roadmap feature for month plan',
          id: 'kzklH3',
        }),
      },
      title: intl.formatMessage({
        defaultMessage: 'Access to Skill Roadmap',
        description: 'Label for skill roadmap feature',
        id: 'fGAB76',
      }),
    },
  };

  return features;
}
