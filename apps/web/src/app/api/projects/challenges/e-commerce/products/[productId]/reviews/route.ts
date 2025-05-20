import { countBy, sum } from 'lodash-es';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import productReviewsAll from '../../../__data/product-reviews.json' with { type: 'json' };
import users from '../../../__data/users.json' with { type: 'json' };

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } },
) {
  const { searchParams } = new URL(request.url);
  // Pagination parameters.
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('per_page')) || 12;

  // Filtering parameters.
  const rating = searchParams.get('rating');

  const { productId } = params;
  const productReviews = productReviewsAll.filter(
    (productReview) => productReview.product_id === productId,
  );

  const ratingCounts = countBy(productReviews.map((review) => review.rating));
  const totalRating = sum(productReviews.map((review) => review.rating));

  const averageRating =
    productReviews.length === 0
      ? 0
      : Math.round((totalRating / productReviews.length) * 10) / 10;

  const filteredReviews = rating
    ? productReviews.filter((review) => review.rating === +rating)
    : productReviews;

  return NextResponse.json({
    aggregate: {
      counts: [
        {
          count: ratingCounts[1] ?? 0,
          rating: 1,
        },
        {
          count: ratingCounts[2] ?? 0,
          rating: 2,
        },
        {
          count: ratingCounts[3] ?? 0,
          rating: 3,
        },
        {
          count: ratingCounts[4] ?? 0,
          rating: 4,
        },
        {
          count: ratingCounts[5] ?? 0,
          rating: 5,
        },
      ],
      rating: averageRating,
      total: productReviews.length,
    },
    data: filteredReviews
      .slice((page - 1) * perPage, page * perPage)
      .map(({ product_id: _productId, user_id, ...review }) => ({
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
