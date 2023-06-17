import clsx from 'clsx';
import { RiLockFill, RiUserSmileLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';
import {
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import QuestionListingSideCard from './QuestionListingSideCard';
import type { QuestionPremiumStatus } from '../../common/QuestionsTypes';

type Props = Readonly<{
  count: number;
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

export default function QuestionListingQuestionCount({
  variant,
  count,
}: Props) {
  const intl = useIntl();
  const Icon = icons[variant];
  const labels = {
    free: intl.formatMessage({
      defaultMessage: 'Free',
      description:
        'Free label for free vs premium question breakdown in question listing',
      id: 'LYaH0T',
    }),
    premium: intl.formatMessage({
      defaultMessage: 'Premium',
      description:
        'Premium label for free vs premium question breakdown in question listing',
      id: '3NSzVn',
    }),
  };

  return (
    <QuestionListingSideCard stripClassName={stripBackgroundClasses[variant]}>
      <div className="flex flex-col gap-2">
        <div className={clsx('flex items-center gap-1', labelClasses[variant])}>
          <Icon className="h-3 w-3" />
          <Text color="inherit" size="body3" weight="medium">
            {labels[variant]}
          </Text>
        </div>
        <div className="flex flex-col">
          <FormattedMessage
            defaultMessage="<count>{questionCount}</count> <questions>questions</questions>"
            description="Number of questions"
            id="mDcqlX"
            values={{
              count: (chunks) => (
                <Text className="text-2xl" size="custom" weight="bold">
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
        </div>
      </div>
    </QuestionListingSideCard>
  );
}
