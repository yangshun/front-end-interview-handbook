import clsx from 'clsx';

import Rating from 'src/components/ui/Rating';
import ProgressBar from 'src/components/ui/ProgressBar';
import Button from 'src/components/ui/Button';

import { useProductReviewsContext } from './ProductReviewsContext';

const OverallRating = () => {
  const { aggregateRating, onRatingSelect, selectedRating } =
    useProductReviewsContext();
  const hasReviews = !!aggregateRating.total;

  const ratingData = [
    {
      name: 'Excellent',
      color: '#16A34A',
      value: aggregateRating.counts.find(item => item.rating === 5).count,
      rating: 5,
    },
    {
      name: 'Good',
      color: '#22C55E',
      value: aggregateRating.counts.find(item => item.rating === 4).count,
      rating: 4,
    },
    {
      name: 'Average',
      color: '#FDE047',
      value: aggregateRating.counts.find(item => item.rating === 3).count,
      rating: 3,
    },
    {
      name: 'Below Average',
      color: '#EAB308',
      value: aggregateRating.counts.find(item => item.rating === 2).count,
      rating: 2,
    },
    {
      name: 'Poor',
      color: '#FACC15',
      value: aggregateRating.counts.find(item => item.rating === 1).count,
      rating: 1,
    },
  ];
  return (
    <div className={clsx('flex flex-col gap-6')}>
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-xl text-neutral-900">
          Overall Rating
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base text-neutral-900">
            {aggregateRating.rating}
          </span>
          <Rating value={4.5} className="gap-2" />
          {hasReviews && (
            <span className="text-sm text-neutral-600 text-nowrap">
              Based on {aggregateRating.total} reviews
            </span>
          )}
        </div>
      </div>

      <fieldset className={clsx('flex flex-col gap-4', 'py-4')}>
        <legend id="rating-filter" className="sr-only">
          Filter by Rating
        </legend>
        {ratingData.map(({ name, color, value, rating }) => {
          const ratingPercentage =
            aggregateRating.total === 0
              ? 0
              : Math.floor((value / aggregateRating.total) * 100);

          return (
            <button
              className={clsx(
                'flex items-center gap-2 self-stretch',
                'text-neutral-600 disabled:text-neutral-400',
                'cursor-pointer disabled:pointer-events-none'
              )}
              key={rating}
              disabled={!hasReviews}
              aria-pressed={selectedRating === rating ? 'true' : 'false'}
              aria-label={`Filter by ${rating} stars`}
              onClick={() => onRatingSelect(rating)}>
              <span
                className={clsx(
                  'w-[120px]',
                  'px-0.5',
                  'text-left font-medium'
                )}>
                {name}
              </span>
              <ProgressBar value={ratingPercentage} color={color} />
              <span className="w-[42px] text-right">{ratingPercentage}%</span>
            </button>
          );
        })}
      </fieldset>

      <div className="flex justify-center gap-6">
        {selectedRating && (
          <div className="flex-1">
            <Button
              label="Clear Filter"
              variant="tertiary"
              size="xl"
              className="w-full"
              onClick={() => onRatingSelect(null)}
            />
          </div>
        )}
        <div className={clsx(selectedRating ? 'flex-1' : 'w-[153px]')}>
          <Button
            label="Write a review"
            variant="secondary"
            size="xl"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default OverallRating;
