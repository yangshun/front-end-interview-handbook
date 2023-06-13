import clsx from 'clsx';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import { themeBackgroundColor, themeLineColor } from '~/components/ui/theme';

export default function QuestionPaywall({
  title: titleProp,
  subtitle: subtitleProp,
  variant = 'not_subscribed',
}: Readonly<{
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
        'rounded-lg border px-8',
        themeLineColor,
        themeBackgroundColor,
      )}>
      <EmptyState
        action={
          <Button
            href="/pricing"
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
