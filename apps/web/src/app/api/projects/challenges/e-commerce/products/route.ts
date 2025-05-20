import { intersection } from 'lodash-es';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import productsAll from '../__data/products.json' with { type: 'json' };
import { buildProductData } from './productData';

const latestArrivalProductIDs = productsAll
  .slice()
  .sort((a, b) => {
    const date1 = new Date(a.created_at).getTime();
    const date2 = new Date(b.created_at).getTime();

    return date2 - date1;
  })
  .slice(0, 8)
  .map(({ product_id }) => product_id);

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // Pagination parameters.
  const perPage = Number(searchParams.get('per_page')) || 9;
  const page = Number(searchParams.get('page')) || 1;

  // Filtering parameters.
  const collections = searchParams.getAll('collection');
  const categories = searchParams.getAll('category');
  const colors = searchParams.getAll('color');
  const ratings = searchParams.getAll('rating');

  // Sorting parameters.
  const sort = searchParams.get('sort') || 'created';
  const direction = searchParams.get('direction') || 'desc';

  const productsWithFullDetails = productsAll.map(({ product_id }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { info, ...productItem } = buildProductData(product_id)!;

    return productItem;
  });

  const filteredProducts = productsWithFullDetails
    // Filter by collection.
    .filter((product) => {
      if (collections.length === 0) {
        return true;
      }

      if (
        collections.includes('latest') &&
        latestArrivalProductIDs.includes(product.product_id)
      ) {
        return true;
      }

      return collections.includes(product.collection!.collection_id);
    })
    // Filter by category.
    .filter((product) => {
      if (categories.length === 0) {
        return true;
      }

      return categories.includes(product.category!.category_id);
    })
    // Filter by color.
    .filter((product) => {
      if (colors.length === 0) {
        return true;
      }

      return intersection(colors, product.colors).length;
    })
    // Filter by rating.
    .filter((product) => {
      if (ratings.length === 0) {
        return true;
      }

      const ratingRanges = ratings.map((rating) => [
        Number(rating),
        Number(rating) + 1,
      ]);

      return ratingRanges.some(
        ([lowerBound, upperBound]) =>
          (product.rating ?? 0) >= lowerBound &&
          (product.rating ?? 0) < upperBound,
      );
    });

  if (sort) {
    filteredProducts.sort((a, b) => {
      switch (sort) {
        case 'created': {
          const date1 = new Date(a.created_at).getTime();
          const date2 = new Date(b.created_at).getTime();
          const value = date1 - date2;

          return direction === 'asc' ? value : -value;
        }
        case 'rating': {
          const value = (a.rating || 0) - (b.rating || 0);

          return direction === 'asc' ? value : -value;
        }
        case 'popularity': {
          const value = (a.sold || 0) - (b.sold || 0);

          return direction === 'asc' ? value : -value;
        }
        case 'price': {
          return direction === 'asc'
            ? a.priceRange.lowest - b.priceRange.lowest
            : b.priceRange.highest - a.priceRange.highest;
        }
      }

      return 0;
    });
  }

  return NextResponse.json({
    data: filteredProducts.slice((page - 1) * perPage, page * perPage),
    pagination: {
      has_more: filteredProducts.length > page * perPage,
      page,
      per_page: perPage,
      total: filteredProducts.length,
    },
  });
}
