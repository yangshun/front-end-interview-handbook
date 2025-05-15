import clsx from 'clsx';
import { RiLockFill, RiUserSmileLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';
import {
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import QuestionListingSideCard from './QuestionListingSideCard';

type QuestionPremiumStatus = 'free' | 'premium';

type Props = Readonly<{
  count: number;
  totalCount?: number;
  variant: QuestionPremiumStatus;
}>;

const stripBackgroundClasses: Record<QuestionPremiumStatus, string> = {
  free: 'bg-neutral-200 dark:bg-neutral-600',
  premium: 'bg-brand-dark dark:bg-brand',
};

const labelClasses: Record<QuestionPremiumStatus, string> = {
  free: themeTextSecondaryColor,
  premium: themeTextBrandColor,
};

const icons: Record<
  QuestionPremiumStatus,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  free: RiUserSmileLine,
  premium: RiLockFill,
};

export default function QuestionListingAccessCount({
  count,
  totalCount,
  variant,
}: Props) {
  const intl = useIntl();
  const Icon = icons[variant];
  const labels = {
    free: intl.formatMessage({
      defaultMessage: 'Free',
      description: 'Free question',
      id: 'azDVOg',
    }),
    premium: intl.formatMessage({
      defaultMessage: 'Premium',
      description: 'Premium question',
      id: 'nS1n8l',
    }),
  };

  return (
    <QuestionListingSideCard stripClassName={stripBackgroundClasses[variant]}>
      <div className="flex flex-col gap-2">
        <div className={clsx('flex items-center gap-1', labelClasses[variant])}>
          <Icon className="size-3" />
          <Text color="inherit" size="body3" weight="medium">
            {labels[variant]}
          </Text>
        </div>
        <div className="flex flex-col">
          {count === totalCount ? (
            <FormattedMessage
              defaultMessage="<count>ALL</count> <questions>questions</questions>"
              description="Number of questions"
              id="LFGT5n"
              values={{
                count: (chunks) => (
                  <Tooltip
                    asChild={true}
                    label={intl.formatMessage({
                      defaultMessage:
                        'All the questions on this list are free to attempt.',
                      description: 'Tooltip for free questions card',
                      id: 'WUvwrX',
                    })}>
                    <Text
                      className="w-fit text-2xl"
                      size="inherit"
                      weight="bold">
                      {chunks}
                    </Text>
                  </Tooltip>
                ),
                questionCount: count,
                questions: (chunks) => (
                  <Text color="secondary" size="body3">
                    {chunks}
                  </Text>
                ),
              }}
            />
          ) : (
            <FormattedMessage
              defaultMessage="<count>{questionCount}</count> <questions>questions</questions>"
              description="Number of questions"
              id="mDcqlX"
              values={{
                count: (chunks) => (
                  <Text className="text-2xl" size="inherit" weight="bold">
                    {chunks}
                  </Text>
                ),
                questionCount: count,
                questions: (chunks) => (
                  <Text color="secondary" size="body3">
                    {chunks}
                  </Text>
                ),
              }}
            />
          )}
        </div>
      </div>
    </QuestionListingSideCard>
  );
}
