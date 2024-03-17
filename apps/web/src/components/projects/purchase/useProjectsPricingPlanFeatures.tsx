import { FormattedMessage, useIntl } from 'react-intl';

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
  const { MONTH: monthPlan, ANNUAL: annualPlan } = plans;
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
        <div className="flex flex-col gap-y-1.5 font-medium">
          <FormattedMessage
            defaultMessage="<keywords>Component tracks are collections of components which make up component libraries for specific practical use cases e.g. Marketing, E-Commerce, or even design systems. Building component tracks can leave a strong impression on potential employers and recruiters, showcasing your expertise and versatility in building a variety of components for common use cases, which is much more impressive than building individual projects.</keywords>"
            description="Description for component tracks feature"
            id="zKAE+G"
            values={{ keywords: (chunks) => <span>{chunks}</span> }}
          />
        </div>
      ),
      plan: {
        FREE: intl.formatMessage({
          defaultMessage: 'Only Marketing track',
          description: 'Label for component tracks feature for free plan',
          id: 'WK23Hh',
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
        <div className="flex flex-col gap-y-1.5 font-medium">
          <FormattedMessage
            defaultMessage="<keywords>Upon purchasing premium, you will be given a number of project unlocks. A project unlock gives you access to all premium features in a free project (figma files, official solutions & guides from senior engineers), OR can unlock a premium challenge.</keywords><keywords>Even when you are not actively subscribed, unspent unlocks will roll over to the next month and remain accessible when you repurchase premium.</keywords>"
            description="Description for unlocks feature"
            id="ptZwYq"
            values={{ keywords: (chunks) => <span>{chunks}</span> }}
          />
        </div>
      ),
      plan: {
        ANNUAL: intl.formatMessage(
          {
            defaultMessage: '{count} unlock credits every year',
            description: 'Label for unlocks feature for annual plan',
            id: 'NrCAxf',
          },
          {
            count: annualPlan.credits,
          },
        ),
        MONTH: intl.formatMessage(
          {
            defaultMessage: '{count} unlock credits every month',
            description: 'Label for unlocks feature for month plan',
            id: '2vqeIa',
          },
          {
            count: monthPlan.credits,
          },
        ),
      },
      title: intl.formatMessage({
        defaultMessage:
          'Able to unlock premium challenges, or premium features on free challenges',
        description: 'Label for unlocks feature',
        id: '/pkHfz',
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
        <div className="flex flex-col gap-y-1.5 font-medium">
          <FormattedMessage
            defaultMessage="<keywords>We provide a roadmap of all the core skills needed to be a great front end engineer, from beginner to advanced. For each skill, we suggest good resources for you to study and projects you can build on our platform to learn the skill. This roadmap is curated by senior engineers with extensive experience in the industry, ensuring the quality and trustworthiness of the content.</keywords><keywords>Additionally, we offer a gamified progress tracking system to monitor your proficiency in applying these skills across our projects</keywords>"
            description="Description for skill roadmap feature"
            id="HOtpix"
            values={{ keywords: (chunks) => <span>{chunks}</span> }}
          />
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
