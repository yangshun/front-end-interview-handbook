import { useMediaQuery } from 'usehooks-ts';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

const ProductReviewsContext = createContext();

export const useProductReviewsContext = () => useContext(ProductReviewsContext);

const ProductReviewsContextProvider = ({ children }) => {
  const isDesktopView = useMediaQuery('(min-width: 1024px)');
  const [reviews, setReviews] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    hasMore: false,
    total: 0,
  });
  const [aggregateRating, setAggregateRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const limit = isDesktopView ? 12 : 10;

  const getReviews = useCallback(
    async (initialFetching = false) => {
      if (initialFetching) {
        setIsInitialLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const data = await fetch(
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/voyager-hoodie/reviews?page=${currentPage}&per_page=${limit}${
          selectedRating ? `&rating=${selectedRating}` : ''
        }`
      );
      const result = await data.json();
      if (result) {
        setReviews(
          currentPage === 1 ? result.data : prev => [...prev, ...result.data]
        );
        setAggregateRating(result.aggregate);
        setPagination({
          hasMore: result.pagination.has_more,
          total: result.pagination.total,
        });
        setCurrentPage(result.pagination.page);
      }
      setIsInitialLoading(false);
      setIsFetchingMore(false);
    },
    [currentPage, limit, selectedRating]
  );

  useEffect(() => {
    getReviews(isInitialLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedRating]);

  const loadMoreReviews = useCallback(() => {
    if (pagination.hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [pagination.hasMore]);

  const onRatingSelect = useCallback(value => {
    setSelectedRating(value);
    setCurrentPage(1);
  }, []);

  const value = useMemo(() => {
    return {
      reviews,
      pagination,
      isInitialLoading,
      isFetchingMore,
      currentPage,
      aggregateRating,
      selectedRating,
      loadMoreReviews,
      onRatingSelect,
    };
  }, [
    reviews,
    pagination,
    isInitialLoading,
    isFetchingMore,
    currentPage,
    aggregateRating,
    selectedRating,
    loadMoreReviews,
    onRatingSelect,
  ]);

  return (
    <ProductReviewsContext.Provider value={value}>
      {children}
    </ProductReviewsContext.Provider>
  );
};

export default ProductReviewsContextProvider;
