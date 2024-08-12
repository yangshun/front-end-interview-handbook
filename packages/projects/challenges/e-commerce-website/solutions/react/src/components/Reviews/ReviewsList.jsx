import clsx from 'clsx';
import { RiChatSmile3Line } from 'react-icons/ri';

import Avatar from 'src/components/ui/Avatar';
import Rating from 'src/components/ui/Rating';
import Button from 'src/components/ui/Button';
import IconWrapper from 'src/components/IconWrapper';

import { useProductReviewsContext } from './ProductReviewsContext';

import { formatDate } from 'src/utils';

const ReviewsList = () => {
  const { reviews, pagination, loadMoreReviews, isFetchingMore, currentPage } =
    useProductReviewsContext();
  const moreReviewsCount = pagination.total - reviews.length;

  if (reviews.length === 0) {
    return (
      <div class="flex flex-col justify-center items-center gap-5 h-full">
        <IconWrapper icon={RiChatSmile3Line} />
        <div
          class={clsx(
            "flex flex-col items-center gap-2', 'text-neutral-900 text-center"
          )}>
          <span class="font-medium text-xl">No reviews yet!</span>
          <span>Be the first to review this product</span>
        </div>
      </div>
    );
  }

  if (currentPage === 1 && isFetchingMore) {
    return (
      <div className="flex flex-col justify-center items-center gap-5 h-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 pb-6">
      <div className="flex flex-col gap-6 md:gap-8">
        {reviews.map(review => (
          <div
            key={review.user.user_id + review.created_at}
            className={clsx('flex flex-col gap-4', 'text-neutral-600')}>
            <div className="flex items-center gap-4">
              <Avatar src={review.user.avatar_url} name={review.user.name} />
              <div className="flex flex-col gap-1 grow">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-base text-neutral-900">
                    {review.user.name}
                  </h4>
                  <span className="text-xs text-nowrap">
                    {formatDate(new Date(review.created_at))}
                  </span>
                </div>
                <Rating value={review.rating} />
              </div>
            </div>
            {review.content && <p>{review.content}</p>}
          </div>
        ))}
      </div>
      {pagination.hasMore && (
        <Button
          label={`See ${moreReviewsCount} more reviews`}
          variant="secondary"
          size="lg"
          onClick={loadMoreReviews}
          isDisabled={isFetchingMore}
        />
      )}
    </div>
  );
};

export default ReviewsList;
