import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUnavailableSizes } from '../utils';

const ProductDetailsContext = createContext();

export const useProductDetailsContext = () => useContext(ProductDetailsContext);

const ProductDetailsContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);

  const getProduct = useCallback(async () => {
    setIsProductLoading(true);
    const data = await fetch(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}`
    );
    const result = await data.json();

    if (!result.error) {
      setProduct(result);
      setSelectedColor(result.colors[0]);
    } else {
      return navigate('/not-found');
    }
    setIsProductLoading(false);
  }, [productId, navigate]);

  const decrementQuantity = useCallback(() => {
    setItemQuantity(prev => (prev > 1 ? prev - 1 : 1));
  }, []);

  const incrementQuantity = useCallback(() => {
    setItemQuantity(prev => prev + 1);
  }, []);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  // Set first available size as the initial selected size
  useEffect(() => {
    if (!product || !selectedColor) {
      return;
    }

    const unavailableSizes = getUnavailableSizes({
      product,
      color: selectedColor,
    });
    const availableSizes = [...product.sizes].filter(
      size => !unavailableSizes.includes(size)
    );
    if (availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    }
  }, [selectedColor, product]);

  const value = useMemo(() => {
    return {
      product,
      isProductLoading,
      selectedColor,
      selectedSize,
      itemQuantity,
      setSelectedColor,
      setSelectedSize,
      incrementQuantity,
      decrementQuantity,
    };
  }, [
    product,
    isProductLoading,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    itemQuantity,
    incrementQuantity,
    decrementQuantity,
  ]);

  return (
    <ProductDetailsContext.Provider value={value}>
      {children}
    </ProductDetailsContext.Provider>
  );
};

export default ProductDetailsContextProvider;
