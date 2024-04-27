import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import productReviewsAll from '../../../__data/product_reviews.json' assert { type: 'json' };
import users from '../../../__data/users.json' assert { type: 'json' };

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } },
) {
  const { searchParams } = new URL(request.url);
  const perPage = Number(searchParams.get('per_page')) || 10;
  const page = Number(searchParams.get('page')) || 1;
  const rating = searchParams.get('rating');

  const { productId } = params;
  const productReviews = productReviewsAll.filter(
    (productReview) => productReview.product_id === productId,
  );

  const filteredReviews = rating
    ? productReviews.filter((review) => review.rating === +rating)
    : productReviews;

  return NextResponse.json({
    data: filteredReviews
      .slice((page - 1) * perPage, page * perPage)
      .map(({ user_id, ...review }) => ({
        ...review,
        user: users.find((user) => user.user_id === user_id),
      })),
    pagination: {
      has_more: filteredReviews.length > page * perPage,
      page,
      per_page: perPage,
      total: filteredReviews.length,
    },
  });
}
