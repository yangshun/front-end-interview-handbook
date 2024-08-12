import clsx from 'clsx';

import OverallRating from './OverallRating';
import ReviewsList from './ReviewsList';

import { useProductReviewsContext } from './ProductReviewsContext';

const Reviews = () => {
  const { isInitialLoading, reviews } = useProductReviewsContext();

  return (
    <div
      className={clsx(
        'h-[calc(100vh_-_232px)]',
        'flex flex-col lg:flex-row gap-10 lg:gap-8'
      )}>
      {isInitialLoading || !reviews ? (
        <div className="w-full h-full flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <>
          <div className={clsx('self-stretch w-full lg:w-96', 'px-6 md:px-8')}>
            <OverallRating />
          </div>
          <div
            className={clsx(
              'flex-1 w-full',
              'px-4 md:px-8 lg:pl-0 lg:pr-8',
              'lg:overflow-y-auto'
            )}>
            <ReviewsList />
          </div>
        </>
      )}
    </div>
  );
};

export default Reviews;
