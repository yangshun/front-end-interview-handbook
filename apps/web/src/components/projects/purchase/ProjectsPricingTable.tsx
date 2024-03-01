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
  themeBorderColor,
  themeBorderElementColor,
  themeDivideColor,
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

// TODO(projects|purchase): Recheck into this function for discount logic
function PricingPlanComparisonDiscount({
  plan,
}: Readonly<{
  plan: ProjectsPricingPlan;
}>) {
  switch (plan.frequency) {
    case 'free':
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
    case 'month':
      return (
        <>
          <span>
            <FormattedMessage
              defaultMessage="{price} billed every month"
              description="Description of billing frequency for monthly plan"
              id="6dx/5B"
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
                    amount={plan.monthlyPrice * 12}
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
    <div
      className={clsx(
        'py-3',
        ['border-b', themeBorderElementColor],
        className,
      )}>
      {children}
    </div>
  );
}

function FeatureCell({
  className,
  label,
  description,
}: {
  className?: string;
  description?: React.ReactNode;
  label: string;
}) {
  return (
    <ItemCell className={clsx('col-span-2 flex items-center gap-2', className)}>
      <Text color="secondary">{label}</Text>
      {description && (
        <Tooltip label={description}>
          <RiQuestionFill
            className={clsx('size-5 shrink-0', themeTextSubtleColor)}
          />
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
    <ItemCell className={clsx('flex items-center gap-2 px-2', className)}>
      {available ? (
        <RiCheckboxCircleFill
          className={clsx('size-6 shrink-0', themeTextSuccessColor)}
        />
      ) : (
        <RiCloseCircleFill
          className={clsx('size-6 shrink-0', themeTextDangerColor)}
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
    <div className={clsx('grid grid-cols-5 gap-x-4', className)}>
      {children}
    </div>
  );
}

type Props = Readonly<{
  plans: Record<ProjectsPricingFrequency, ProjectsPricingPlan>;
}>;

type Feature = Readonly<{
  description?: React.ReactNode;
  plan?: Partial<Record<ProjectsPricingFrequency, string>>;
  title: string;
}>;

type ProjectsFeaturesObject = Record<ProjectsFeatures, Feature>;

export default function ProjectsPricingTable({ plans }: Props) {
  const intl = useIntl();

  const { free: freePlan, month: monthPlan, annual: annualPlan } = plans;
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
        free: intl.formatMessage({
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
        free: intl.formatMessage({
          defaultMessage: 'Only foundational skills',
          description: 'Label for skill roadmap feature for month plan',
          id: 'MZyEk9',
        }),
        month: intl.formatMessage({
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
            defaultMessage: '{count} unlocks every year',
            description: 'Label for unlocks feature for annual plan',
            id: '7ZqJXd',
          },
          {
            count: annualPlan.features.unlocks,
          },
        ),
        month: intl.formatMessage(
          {
            defaultMessage: '{count} unlocks every month',
            description: 'Label for unlocks feature for month plan',
            id: 'YGyElJ',
          },
          {
            count: monthPlan.features.unlocks,
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

  const freePlanTitle = intl.formatMessage({
    defaultMessage: 'Free plan',
    description: 'Label for free plan',
    id: 'ge4FCc',
  });

  const monthPlanTitle = intl.formatMessage({
    defaultMessage: 'Monthly plan',
    description: 'Label for monthly plan',
    id: '+cF6Ba',
  });

  const annualPlanTitle = intl.formatMessage({
    defaultMessage: 'Annual plan',
    description: 'Label for annual plan',
    id: '0tgQZt',
  });

  const plansList: ReadonlyArray<{
    key: ProjectsPricingFrequency;
    plan: ProjectsPricingPlan;
    title: string;
  }> = [
    { key: 'free', plan: freePlan, title: freePlanTitle },
    { key: 'month', plan: monthPlan, title: monthPlanTitle },
    { key: 'annual', plan: annualPlan, title: annualPlanTitle },
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
      {/* Desktop */}
      <div
        className={clsx(
          'hidden flex-col gap-5 md:flex',
          'px-8 py-6',
          'rounded-3xl',
          ['border', themeBorderColor],
          'bg-white/20 dark:bg-neutral-800/20',
        )}>
        <Row>
          {plansList.map((header, index) => (
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
                {header.plan.frequency !== 'free' && (
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
      {/* Mobile and Tablet */}
      <div
        className={clsx(
          'mx-auto flex max-w-lg flex-col md:hidden',
          'rounded-3xl',
          ['border', themeBorderColor],
          ['divide-y', themeDivideColor],
          'bg-white/20 dark:bg-neutral-800/20',
        )}>
        {plansList.map(({ key, plan, title }) => {
          const availableFeatures = Object.keys(plan.features).filter(
            (feature) => !!plan.features[feature as ProjectsFeatures],
          );
          const availableFeaturesDetails = featureDetails.filter((feature) =>
            availableFeatures.includes(feature.key),
          );

          return (
            <div
              key={key}
              className={clsx(
                'flex flex-col justify-between gap-4',
                'px-8 py-6',
              )}>
              <div className="flex flex-col gap-4">
                <Text color="subtitle" weight="medium">
                  {title}
                </Text>
                <div className="flex items-center justify-between gap-2">
                  <Text
                    className="flex items-baseline gap-x-2"
                    color="subtitle"
                    display="flex"
                    weight="medium">
                    <span>
                      <PriceLabel
                        amount={plan.monthlyPrice}
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
                  {plan.discount > 0 && (
                    <Text
                      className={clsx(
                        'md:min-h-8 flex-col items-center justify-center pt-1',
                      )}
                      display="inline-flex"
                      size="body3">
                      <PricingPlanComparisonDiscount plan={plan} />
                    </Text>
                  )}
                </div>
                {key !== 'free' && (
                  <div className="flex w-full flex-col items-center gap-2">
                    <Button
                      className="w-full"
                      label="Unlock Premium"
                      size="md"
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
              <div className="flex flex-col">
                {availableFeaturesDetails.map(
                  ({ feature, key: featureKey }, index) => (
                    <FeatureCell
                      key={featureKey}
                      className={clsx(
                        '!items-start',
                        index === availableFeaturesDetails.length - 1 &&
                          'border-none',
                      )}
                      description={feature.description}
                      label={feature.title}
                    />
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
