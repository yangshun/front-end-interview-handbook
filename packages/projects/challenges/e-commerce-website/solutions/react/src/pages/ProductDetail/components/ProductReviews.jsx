import clsx from 'clsx';
import { useState } from 'react';

import Button from 'src/components/ui/Button';
import Rating from 'src/components/ui/Rating/Rating';
import ProductReviewsModal from './ProductReviewsModal';

const ProductReviews = ({ rating, reviews }) => {
  const [openReviewsModal, setOpenReviewsModal] = useState(false);
  return (
    <div className={clsx('flex items-center gap-2 flex-wrap', 'mt-3')}>
      <div className="text-xl text-neutral-900">{rating ?? 0}</div>
      <Rating value={rating ?? 0} />
      {reviews > 0 ? (
        <Button
          label={`See all ${reviews} reviews`}
          onClick={() => setOpenReviewsModal(true)}
          variant="link"
          className="text-sm"
        />
      ) : (
        <div className="flex gap-[2px]">
          <span className="text-sm text-neutral-900">No reviews yet.</span>
          <Button
            label="Be the first."
            href="#"
            variant="link"
            className="text-sm"
          />
        </div>
      )}

      <ProductReviewsModal
        isOpen={openReviewsModal}
        onClose={() => setOpenReviewsModal(false)}
      />
    </div>
  );
};

export default ProductReviews;
