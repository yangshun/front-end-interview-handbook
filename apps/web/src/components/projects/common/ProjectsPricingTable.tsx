'use client';

import clsx from 'clsx';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiQuestionFill,
} from 'react-icons/ri';
import { FormattedMessage, FormattedNumberParts, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerColor,
  themeGlassyBorder,
  themeTextBrandColor,
  themeTextDangerColor,
  themeTextSubtleColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type {
  ProjectsFeatures,
  ProjectsPricingFrequency,
  ProjectsPricingPlan,
} from '../types';

function PriceLabel({
  amount,
  symbol,
  currency,
  children,
}: Readonly<{
  amount: number;
  children?: (val: Array<Intl.NumberFormatPart>) => React.ReactElement | null;
  currency: string;
  symbol: string;
}>) {
  return (
    <FormattedNumberParts
      currency={currency.toUpperCase()}
      currencyDisplay={symbol !== '$' ? 'narrowSymbol' : undefined}
      maximumFractionDigits={0}
      style="currency"
      value={amount}>
      {(parts) =>
        children == null ? (
          <>{parts.map((part) => part.value).join('')}</>
        ) : (
          children(parts)
        )
      }
    </FormattedNumberParts>
  );
}

// TODO(projects): Recheck into this function for discount logic
function PricingPlanComparisonDiscount({
  plan,
}: Readonly<{
  plan: ProjectsPricingPlan;
}>) {
  switch (plan.frequency) {
    case 'month':
      return (
        <span>
          <FormattedMessage
            defaultMessage="{price} billed per month."
            description="Description of billing frequency for monthly plan"
            id="pDo/V5"
            values={{
              price: (
                <PriceLabel
                  amount={plan.monthlyPrice}
                  currency="USD"
                  symbol="$"
                />
              ),
            }}
          />{' '}
          <FormattedMessage
            defaultMessage="Cancel anytime."
            description="Cancel the subscription anytime."
            id="GHQ8sO"
          />
        </span>
      );
    case 'quarter':
      return (
        <>
          <span>
            <FormattedMessage
              defaultMessage="{price} billed every 3 months"
              description="Description of billing frequency for quarterly plan"
              id="2XR9B5"
              values={{
                price: (
                  <PriceLabel
                    amount={plan.monthlyPrice}
                    currency="USD"
                    symbol="$"
                  />
                ),
              }}
            />{' '}
          </span>
          <span className={themeTextBrandColor}>
            <FormattedMessage
              defaultMessage="(Save {discountPercentage}% vs monthly)"
              description="Save more compared to monthly plan."
              id="Dynazi"
              values={{
                discountPercentage: plan.discount,
              }}
            />
          </span>
        </>
      );
    case 'annual':
      return (
        <>
          <span>
            <FormattedMessage
              defaultMessage="{price} billed yearly"
              description="Description of billing frequency for annual plan"
              id="7uB2Jj"
              values={{
                price: (
                  <PriceLabel
                    amount={plan.monthlyPrice}
                    currency="USD"
                    symbol="$"
                  />
                ),
              }}
            />{' '}
          </span>
          <span className={themeTextBrandColor}>
            <FormattedMessage
              defaultMessage="(Save {discountPercentage}% vs monthly)"
              description="Save more compared to monthly plan."
              id="Dynazi"
              values={{
                discountPercentage: plan.discount,
              }}
            />
          </span>
        </>
      );
  }
}

function HeaderCell({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx('p-1', className)}>{children}</div>;
}

function ItemCell({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('border-b border-neutral-800 px-1 py-3', className)}>
      {children}
    </div>
  );
}

function FeatureCell({
  className,
  label,
  available,
  description,
  showAvailable,
}: {
  available?: boolean;
  className?: string;
  description?: React.ReactNode;
  label: string;
  showAvailable?: boolean;
}) {
  return (
    <ItemCell className={clsx('col-span-2 flex items-center gap-2', className)}>
      {showAvailable &&
        (available ? (
          <RiCheckboxCircleFill
            className={clsx('size-5 shrink-0', themeTextSuccessColor)}
          />
        ) : (
          <RiCloseCircleFill
            className={clsx('size-5 shrink-0', themeTextDangerColor)}
          />
        ))}
      <Text color="secondary">{label}</Text>
      {description && (
        <Tooltip label={description}>
          <RiQuestionFill className={clsx('size-4', themeTextSubtleColor)} />
        </Tooltip>
      )}
    </ItemCell>
  );
}

function PlanCell({
  available,
  label,
  className,
}: {
  available: boolean;
  className?: string;
  label?: string;
}) {
  return (
    <ItemCell className={clsx('flex items-center gap-2', className)}>
      {available ? (
        <RiCheckboxCircleFill
          className={clsx('size-5 shrink-0', themeTextSuccessColor)}
        />
      ) : (
        <RiCloseCircleFill
          className={clsx('size-5 shrink-0', themeTextDangerColor)}
        />
      )}
      {label && (
        <Text color="secondary" size="body3">
          {label}
        </Text>
      )}
    </ItemCell>
  );
}

function Row({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('grid grid-cols-5 gap-x-1', className)}>
      {children}
    </div>
  );
}

type Props = {
  plans: {
    annual: ProjectsPricingPlan;
    month: ProjectsPricingPlan;
    quarter: ProjectsPricingPlan;
  };
};

type Feature = {
  description?: React.ReactNode;
  plan?: {
    annual?: string;
    month?: string;
    quarter?: string;
  };
  title: string;
};

type ProjectsFeaturesObject = Record<ProjectsFeatures, Feature>;

export default function ProjectsPricingTable({ plans }: Props) {
  const intl = useIntl();

  const { month: monthPlan, quarter: quarterPlan, annual: annualPlan } = plans;
  const features: ProjectsFeaturesObject = {
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
        month: intl.formatMessage({
          defaultMessage: 'Only Marketing track',
          description: 'Label for component tracks feature for month plan',
          id: 'DcTrsK',
        }),
      },
      title: intl.formatMessage({
        defaultMessage: 'Access to Component Tracks',
        description: 'Label for component tracks feature',
        id: '3QliNF',
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
        annual: intl.formatMessage({
          defaultMessage: 'From beginner to advanced',
          description: 'Label for skill roadmap feature for annual plan',
          id: 'J1pqvo',
        }),
        month: intl.formatMessage({
          defaultMessage: 'Only foundational skills',
          description: 'Label for skill roadmap feature for month plan',
          id: 'MZyEk9',
        }),
        quarter: intl.formatMessage({
          defaultMessage: 'From beginner to advanced',
          description: 'Label for skill roadmap feature for quarter plan',
          id: 'nI/YEK',
        }),
      },
      title: intl.formatMessage({
        defaultMessage: 'Access to Skill Roadmap',
        description: 'Label for skill roadmap feature',
        id: 'fGAB76',
      }),
    },
    unlocks: {
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
        annual: intl.formatMessage(
          {
            defaultMessage: '{count} unlocks per month',
            description: 'Label for unlocks feature for annual plan',
            id: '3pRgf/',
          },
          {
            count: annualPlan.features.unlocks,
          },
        ),
        quarter: intl.formatMessage(
          {
            defaultMessage: '{count} unlocks instantly',
            description: 'Label for unlocks feature for quarter plan',
            id: 'NwvgLo',
          },
          {
            count: quarterPlan.features.unlocks,
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
  };

  const monthPlanTitle = intl.formatMessage({
    defaultMessage: 'Monthly Plan',
    description: 'Label for month plan',
    id: 'tn3Q/s',
  });

  const quarterPlanTitle = intl.formatMessage({
    defaultMessage: 'Quarterly Plan',
    description: 'Label for quarterly plan',
    id: 'dwficr',
  });

  const annualPlanTitle = intl.formatMessage({
    defaultMessage: 'Annual Plan',
    description: 'Label for annual plan',
    id: 'M9bmeU',
  });

  const plansHeader = [
    {
      plan: monthPlan,
      title: monthPlanTitle,
    },
    {
      plan: quarterPlan,
      title: quarterPlanTitle,
    },
    {
      plan: annualPlan,
      title: annualPlanTitle,
    },
  ];

  const plansList: ReadonlyArray<{
    key: ProjectsPricingFrequency;
    plan: ProjectsPricingPlan;
  }> = [
    { key: 'month', plan: monthPlan },
    { key: 'quarter', plan: quarterPlan },
    { key: 'annual', plan: annualPlan },
  ];
  const featureDetails: ReadonlyArray<{
    feature: Feature;
    key: ProjectsFeatures;
  }> = [
    { feature: features.freeChallenges, key: 'freeChallenges' },
    { feature: features.breakpoints, key: 'breakpoints' },
    { feature: features.apps, key: 'apps' },
    { feature: features.skillRoadmap, key: 'skillRoadmap' },
    { feature: features.componentTracks, key: 'componentTracks' },
    { feature: features.unlocks, key: 'unlocks' },
  ];

  return (
    <div>
      <Heading className="sr-only" level="custom">
        <FormattedMessage
          defaultMessage="Projects Pricing Plans"
          description="Screen reader text referring to the Pricing Plan cards"
          id="1iCorD"
        />
      </Heading>
      <div
        className={clsx(
          'hidden flex-col gap-2 rounded-3xl p-4 md:flex',
          themeGlassyBorder,
          themeBackgroundLayerColor,
        )}>
        <Row>
          {plansHeader.map((header, index) => (
            <HeaderCell
              key={header.plan.frequency}
              className={clsx('h-full', index === 0 && 'col-start-3')}>
              <div className="flex h-full flex-col items-center gap-4">
                <Text color="subtitle" weight="medium">
                  {header.title}
                </Text>
                <div className="flex flex-1 flex-col items-center">
                  <Text
                    className="flex items-baseline gap-x-2"
                    color="subtitle"
                    display="flex"
                    weight="medium">
                    <span>
                      <PriceLabel
                        amount={header.plan.monthlyPrice}
                        currency="USD"
                        symbol="$">
                        {(parts) => (
                          <>
                            {parts[0].value}
                            <Text
                              className="text-3xl font-bold tracking-tight"
                              color="default"
                              size="inherit"
                              weight="inherit">
                              <>
                                {parts
                                  .slice(1)
                                  .map((part) => part.value)
                                  .join('')}
                              </>
                            </Text>
                          </>
                        )}
                      </PriceLabel>
                    </span>
                    <FormattedMessage
                      defaultMessage="/month"
                      description="Per month"
                      id="aE1FCD"
                    />
                  </Text>
                  {header.plan.discount > 0 && (
                    <Text
                      className={clsx(
                        'md:min-h-8 flex-col items-center justify-center pt-1',
                      )}
                      display="inline-flex"
                      size="body3">
                      <PricingPlanComparisonDiscount plan={header.plan} />
                    </Text>
                  )}
                </div>
                {header.plan.frequency !== 'month' && (
                  <div className="flex w-full flex-col items-center gap-2">
                    <Button
                      className="w-full"
                      label="Unlock Premium"
                      variant="primary"
                    />
                    <Text color="secondary" size="body3">
                      <FormattedMessage
                        defaultMessage="14-day money back guarantee"
                        description="Label for money back guarantee"
                        id="mGUPkU"
                      />
                    </Text>
                  </div>
                )}
              </div>
            </HeaderCell>
          ))}
        </Row>
        <div>
          {featureDetails.map(({ key, feature }, index) => (
            <Row key={key}>
              <FeatureCell
                className={clsx(
                  'pr-4',
                  index === featureDetails.length - 1 && 'border-none',
                )}
                description={feature.description}
                label={feature.title}
              />
              {plansList.map(({ key: planKey, plan }) => (
                <PlanCell
                  key={planKey}
                  available={plan.features[key] as boolean}
                  className={clsx(
                    index === featureDetails.length - 1 && 'border-none',
                  )}
                  label={features[key].plan?.[planKey]}
                />
              ))}
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}
