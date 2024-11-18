'use client';

import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiLockLine,
  RiShiningFill,
  RiToolsLine,
} from 'react-icons/ri';

import InterviewsPricingTableDialog from '~/components/interviews/purchase/InterviewsPricingTableDialog';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBorderColor,
  themeGlassyBorder,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import type { QuestionFeatureType } from './QuestionsTypes';

type PremiumWallVariant = 'not_subscribed' | 'under_construction';

const icons: Record<
  PremiumWallVariant,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  not_subscribed: RiLockLine,
  under_construction: RiToolsLine,
};
const colors: Record<PremiumWallVariant, string> = {
  not_subscribed: themeTextSecondaryColor,
  under_construction: themeTextSecondaryColor,
};

type Props = Readonly<{
  background?: boolean;
  feature?: QuestionFeatureType;
  subtitle?: string;
  title?: string;
  variant?: PremiumWallVariant;
}>;

export default function QuestionPaywall({
  title: titleProp,
  subtitle: subtitleProp,
  variant = 'not_subscribed',
  background = true,
  feature = 'premium-questions',
}: Props) {
  const intl = useIntl();

  const featuresHeading: Record<
    QuestionFeatureType,
    Readonly<{ subtitle: string; title: string }>
  > = {
    'company-guides': {
      subtitle: intl.formatMessage({
        defaultMessage:
          'Purchase premium to unlock company guides and all the best materials we have to offer.',
        description: 'Paywall subtitle for company guides feature',
        id: 'Dpfbeq',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Premium company guide',
        description: 'Paywall title for company guides feature',
        id: 'Q0yp+r',
      }),
    },
    'company-tags': {
      subtitle: intl.formatMessage({
        defaultMessage:
          'Purchase premium to unlock company tags and all the best materials we have to offer.',
        description: 'Paywall subtitle for company tags feature',
        id: 'J2nKZE',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Premium company tag',
        description: 'Paywall title for company tags feature',
        id: 'oyk4XO',
      }),
    },
    'focus-areas': {
      subtitle: intl.formatMessage({
        defaultMessage:
          'Purchase premium to unlock focus areas and all the best materials we have to offer.',
        description: 'Paywall subtitle for focus areas feature',
        id: 'fteidk',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Premium focus area',
        description: 'Paywall title for focus areas feature',
        id: 'XkWy18',
      }),
    },
    'official-solutions': {
      subtitle: intl.formatMessage({
        defaultMessage:
          'Purchase premium to unlock official solutions and all the best materials we have to offer.',
        description: 'Paywall subtitle for official solutions feature',
        id: 't44/MF',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Premium solution',
        description: 'Paywall title for official solutions feature',
        id: 'pfFpYc',
      }),
    },
    'premium-questions': {
      subtitle: intl.formatMessage({
        defaultMessage:
          'Purchase premium to unlock premium questions and all the best materials we have to offer.',
        description: 'Paywall subtitle for premium questions feature',
        id: 'bdt+FN',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Premium question',
        description: 'Paywall title for premium questions feature',
        id: 'DV+l42',
      }),
    },
    'study-plans': {
      subtitle: intl.formatMessage({
        defaultMessage:
          'Purchase premium to unlock study plans and all the best materials we have to offer.',
        description: 'Paywall subtitle for study plans feature',
        id: 'NgyZKR',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Premium study plan',
        description: 'Paywall title for study plans feature',
        id: 'yCznFA',
      }),
    },
  };

  const { title: featureTitle, subtitle: featuresSubtitle } =
    featuresHeading[feature];
  const title = titleProp ?? featureTitle;
  const subtitle = subtitleProp ?? featuresSubtitle;
  const Icon = icons[variant];

  const tags = [
    intl.formatMessage({
      defaultMessage: 'All premium questions',
      description: 'Paywall tags',
      id: 'Q2Z3oz',
    }),
    intl.formatMessage({
      defaultMessage: 'High quality solutions',
      description: 'Paywall tags',
      id: 'wzeI1v',
    }),
    intl.formatMessage({
      defaultMessage: 'Time-savers like focus areas',
      description: 'Paywall tags',
      id: 'kqHSpd',
    }),
    intl.formatMessage({
      defaultMessage: 'Front end system design guides',
      description: 'Paywall tags',
      id: 'DxjQLP',
    }),
  ];

  return (
    <div
      className={clsx(
        background &&
          clsx(
            'rounded-lg border px-8 backdrop-blur',
            'bg-white/60 dark:bg-neutral-950/60',
            themeBorderColor,
          ),
      )}>
      <div
        className={clsx(
          'flex flex-col gap-6',
          'mx-auto max-w-md py-6 text-center sm:py-12',
        )}>
        <Icon
          aria-hidden="true"
          className={clsx('size-10 mx-auto shrink-0', colors[variant])}
        />
        <div>
          <Heading
            className={textVariants({
              size: 'body1',
              weight: 'bold',
            })}
            level="custom">
            {title}
          </Heading>
          {subtitle && (
            <Text
              className="text-pretty mt-2 block"
              color="secondary"
              size="body2">
              {subtitle}
            </Text>
          )}
        </div>
        <Section>
          <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-3">
            {tags.map((tag) => (
              <div
                key={tag}
                className={clsx('w-fit rounded-md', themeGlassyBorder)}>
                <div
                  className={clsx(
                    'flex items-center gap-1',
                    'rounded-[inherit]',
                    'px-2 py-1.5',
                    'bg-[linear-gradient(94.4deg,_#F0F0F0_3.45%,_#FFFFFF_98.28%)] dark:bg-[linear-gradient(94.4deg,_#343434_3.45%,_#18181B_98.28%)]',
                  )}>
                  <RiShiningFill
                    className={clsx('size-3 shrink-0', themeTextBrandColor)}
                  />
                  <Text size="body3" weight="medium">
                    {tag}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <div>
            <InterviewsPricingTableDialog
              feature={feature}
              trigger={
                <Button
                  icon={RiArrowRightLine}
                  label={intl.formatMessage({
                    defaultMessage: 'View subscription plans',
                    description:
                      'Button displayed on paywall on premium question pages, leading to our pricing plans',
                    id: 'ENNKyg',
                  })}
                  variant="primary"
                />
              }
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
