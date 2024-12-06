import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { PromotionsReviewCashbackCard } from './review/PromotionsReviewCashbackCard';
import { PromotionsSeasonalDiscountCard } from './seasonal/PromotionsSeasonalDiscountCard';
import { PromotionsSocialDiscountCard } from './social/PromotionsSocialDiscountCard';
import { PromotionsStudentDiscountCard } from './student/PromotionsStudentDiscountCard';

export default function PromotionsSection() {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-end gap-6">
      <div
        className={clsx(
          'w-full',
          'grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6',
        )}>
        <PromotionsSeasonalDiscountCard variant="compact" />
        <PromotionsSocialDiscountCard variant="compact" />
        <PromotionsStudentDiscountCard variant="compact" />
        <PromotionsReviewCashbackCard variant="compact" />
      </div>
      <Button
        href="/promotions"
        icon={RiArrowRightLine}
        label={intl.formatMessage({
          defaultMessage: 'See all promotions',
          description: 'Button label for see all promotions',
          id: 'heJjBk',
        })}
        size="md"
        variant="tertiary"
      />
    </div>
  );
}
