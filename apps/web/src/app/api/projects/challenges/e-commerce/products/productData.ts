import { maxBy, meanBy, minBy, round, sumBy, union } from 'lodash-es';

import categories from '../__data/categories.json' assert { type: 'json' };
import collections from '../__data/collections.json' assert { type: 'json' };
import inventory from '../__data/inventory.json' assert { type: 'json' };
import productImagesAll from '../__data/product-images.json' assert { type: 'json' };
import productInfoAll from '../__data/product-info.json' assert { type: 'json' };
import productReviewsAll from '../__data/product-reviews.json' assert { type: 'json' };
import productsAll from '../__data/products.json' assert { type: 'json' };

export function buildProductData(productId: string) {
  const product = productsAll.find(
    (productItem) => productItem.product_id === productId,
  );

  if (!product) {
    return null;
  }

  const reviews = productReviewsAll.filter(
    (productReview) => productReview.product_id === productId,
  );
  const productInventory = inventory.filter(
    (inventoryItem) => inventoryItem.product_id === productId,
  );
  const productInfo = productInfoAll.filter(
    (infoItem) => infoItem.product_id === productId,
  );
  const productImages = productImagesAll.filter(
    (imageItem) => imageItem.product_id === productId,
  );

  return {
    ...product,
    category: categories.find(
      (category) => category.category_id === product.category,
    ),
    collection: collections.find(
      (collection) => collection.collection_id === product.collection,
    ),
    colors: union(productInventory.map((item) => item.color)),
    images: productImages.map(({ product_id: _productId, ...data }) => data),
    info: productInfo.map(({ product_id: _productId, ...data }) => data),
    inventory: productInventory.map(
      ({ product_id: _productId, ...data }) => data,
    ),
    priceRange: {
      highest:
        maxBy(productInventory, (item) => item.sale_price)?.sale_price ?? 0,
      lowest:
        minBy(productInventory, (item) => item.sale_price)?.sale_price ?? 0,
    },
    rating:
      round(
        meanBy(reviews, (review) => review.rating),
        2,
      ) || null,
    reviews: reviews.length,
    sizes: union(productInventory.map((item) => item.size)).flatMap((item) =>
      item != null ? [item] : [],
    ),
    sold: sumBy(productInventory, (item) => item.sold),
  };
}
