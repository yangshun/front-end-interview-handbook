'use client';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import { themeBorderColor } from '~/components/ui/theme';

export default function QuestionPaywall({
  title: titleProp,
  subtitle: subtitleProp,
  variant = 'not_subscribed',
  background = true,
}: Readonly<{
  background?: boolean;
  subtitle?: string;
  title?: string;
  variant?: 'not_subscribed' | 'under_construction';
}>) {
  const intl = useIntl();
  const title =
    titleProp ??
    intl.formatMessage({
      defaultMessage: 'Premium Question',
      description:
        "Title on question paywall displayed on premium question's pages",
      id: 'gdGavv',
    });
  const subtitle =
    subtitleProp ??
    intl.formatMessage({
      defaultMessage:
        'Purchase premium to unlock full access to the question including high quality solutions and companies which ask this question.',
      description:
        "Subtitle on question paywall displayed on premium question's pages",
      id: 'DAqJ87',
    });

  return (
    <div
      className={clsx(
        background &&
          clsx(
            'rounded-lg border bg-white/60 px-8 backdrop-blur dark:bg-neutral-950/60',
            themeBorderColor,
          ),
      )}>
      <EmptyState
        action={
          <Button
            href="/interviews/pricing"
            label={intl.formatMessage({
              defaultMessage: 'View subscription plans',
              description:
                'Button displayed on paywall on premium question pages, leading to our pricing plans',
              id: 'ENNKyg',
            })}
            variant="primary"
          />
        }
        subtitle={subtitle}
        title={title}
        variant={variant}
      />
    </div>
  );
}
