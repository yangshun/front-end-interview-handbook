import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useProductFilters from './hooks/useProductFilters';
import {
  CATEGORY_OPTIONS,
  COLLECTIONS_OPTIONS,
  COLORS_OPTIONS,
  RATING_OPTIONS,
} from 'src/constants';

const ProductListingContext = createContext();

export const useProductListingContext = () => useContext(ProductListingContext);

const ProductListingContextProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const {
    selectedCollections,
    selectedCategory,
    selectedColors,
    selectedRating,
    selectedSort,
    filterCount,
    onSelect,
    resetFilters,
    onSortChange,
  } = useProductFilters();

  const getProducts = useCallback(
    async ({ colors, collections, ratings, categories, sort }) => {
      setIsProductsLoading(true);

      let queryString = '';
      if (
        colors.size > 0 ||
        collections.size > 0 ||
        ratings.size > 0 ||
        categories.size > 0
      ) {
        queryString = [
          ...Array.from(colors).map(
            color => `${COLORS_OPTIONS.key}=${encodeURIComponent(color)}`
          ),
          ...Array.from(collections).map(
            collection =>
              `${COLLECTIONS_OPTIONS.key}=${encodeURIComponent(collection)}`
          ),
          ...Array.from(ratings).map(
            rating => `${RATING_OPTIONS.key}=${encodeURIComponent(rating)}`
          ),
          ...Array.from(categories).map(
            category =>
              `${CATEGORY_OPTIONS.key}=${encodeURIComponent(category)}`
          ),
        ].join('&');
      }

      queryString = `${queryString ? `${queryString}&` : ''}sort=${
        sort.value
      }&direction=${sort.direction}`;

      const data = await fetch(
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products${
          queryString ? `?${queryString}` : ''
        }`
      );
      const result = await data.json();

      if (!result.error) {
        setProducts(result.data);
      }
      setIsProductsLoading(false);
    },
    []
  );

  useEffect(() => {
    getProducts({
      colors: selectedColors,
      categories: selectedCategory,
      collections: selectedCollections,
      ratings: selectedRating,
      sort: selectedSort,
    });
  }, [
    getProducts,
    selectedColors,
    selectedCategory,
    selectedCollections,
    selectedRating,
    selectedSort,
  ]);

  const value = useMemo(() => {
    return {
      products,
      isProductsLoading,

      selectedCollections,
      selectedCategory,
      selectedColors,
      selectedRating,
      selectedSort,
      filterCount,
      onSelect,
      resetFilters,
      onSortChange,
    };
  }, [
    products,
    isProductsLoading,

    selectedCollections,
    selectedCategory,
    selectedColors,
    selectedRating,
    selectedSort,
    filterCount,
    onSelect,
    resetFilters,
    onSortChange,
  ]);

  return (
    <ProductListingContext.Provider value={value}>
      {children}
    </ProductListingContext.Provider>
  );
};

export default ProductListingContextProvider;
