import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getStockChangedData,
  mergeSampleAndStorageCartItems,
} from 'src/pages/Cart/utils';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [stockChangedItems, setStockChangedItems] = useState([]);
  const [discount, setDiscount] = useState({
    coupon_code: 'GR8FRNTND24',
    discount_amount: 5,
    discount_percentage: null,
  });
  const [isFetching, setIsFetching] = useState(true);
  const [checkingStock, setCheckingStock] = useState(false);
  const [showStockChangedModal, setShowStockChangedModal] = useState(false);
  const [isCartEmptyAfterStockChanged, setIsCartEmptyAfterStockChanged] =
    useState(false);

  const updateCartItems = (items) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const checkForStockChanged = useCallback(async (cartItems) => {
    setCheckingStock(true);
    const { products: data, isCartEmpty } =
      await getStockChangedData(cartItems);
    setStockChangedItems(data);
    setShowStockChangedModal(data.length > 0);
    setCheckingStock(false);
    setIsCartEmptyAfterStockChanged(isCartEmpty);
    return data.length > 0;
  }, []);

  const getCartItems = useCallback(async () => {
    setIsFetching(true);

    const data = await fetch(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/cart-sample`,
    );
    const result = await data.json();

    if (!result.error) {
      const finalCartItems = mergeSampleAndStorageCartItems(result.items);
      updateCartItems(finalCartItems);
      checkForStockChanged(finalCartItems);
    }
    setIsFetching(false);
  }, [checkForStockChanged]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const removeFromCart = useCallback(
    (item) => {
      const updatedCart = cartItems.filter(
        (cartItem) =>
          !(
            cartItem.product.product_id === item.product.product_id &&
            cartItem.unit.color === item.unit.color &&
            cartItem.unit.size === item.unit.size
          ),
      );
      updateCartItems(updatedCart);
    },
    [cartItems],
  );

  const changeQuantity = useCallback(
    (item, increment = true) => {
      let updatedCart;

      updatedCart = cartItems.map((cartItem) => {
        if (
          cartItem.product.product_id === item.product.product_id &&
          cartItem.unit.color === item.unit.color &&
          cartItem.unit.size === item.unit.size
        ) {
          const finalQuantity = increment
            ? item.quantity + 1
            : item.quantity - 1;

          return {
            ...cartItem,
            quantity: finalQuantity,
            total_list_price: finalQuantity * cartItem.unit.list_price,
            total_sale_price: finalQuantity * cartItem.unit.sale_price,
          };
        }
        return cartItem;
      });

      updateCartItems(updatedCart);
    },
    [cartItems],
  );

  const acknowledgeStockChanged = useCallback(
    (cartItems, currentStockItems, isCartEmptyAfterStockChanged) => {
      const updatedCartItems = cartItems.reduce((acc, item) => {
        const product = currentStockItems.find(
          (cartItem) =>
            cartItem.product.product_id === item.product.product_id &&
            cartItem.unit.sku === item.unit.sku,
        );

        if (product) {
          // if there is stock then update the quantity, otherwise remove it
          if (product.stock > 0) {
            acc.push({
              ...item,
              quantity: product.stock,
            });
          }
        } else {
          acc.push(item);
        }

        setShowStockChangedModal(false);

        return acc;
      }, []);

      updateCartItems(updatedCartItems);
      if (isCartEmptyAfterStockChanged) {
        navigate('/cart');
      }
    },
    [navigate],
  );

  const value = useMemo(
    () => ({
      cartItems,
      isFetching,
      discount,
      stockChangedItems,
      checkingStock,
      showStockChangedModal,
      isCartEmptyAfterStockChanged,
      setShowStockChangedModal,
      acknowledgeStockChanged,
      checkForStockChanged,
      setDiscount,
      removeFromCart,
      incrementQuantity: (item) => changeQuantity(item, true),
      decrementQuantity: (item) => changeQuantity(item, false),
    }),
    [
      cartItems,
      isFetching,
      discount,
      stockChangedItems,
      checkingStock,
      showStockChangedModal,
      isCartEmptyAfterStockChanged,
      setShowStockChangedModal,
      acknowledgeStockChanged,
      checkForStockChanged,
      setDiscount,
      removeFromCart,
      changeQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
