import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const addToCart = useCallback(
    item => {
      const existingItem = cartItems.find(
        cartItem =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = cartItems.map(cartItem =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        );
      } else {
        updatedCart = [...cartItems, item];
      }

      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    },
    [cartItems]
  );

  const removeFromCart = useCallback(
    (itemId, color, size) => {
      const updatedCart = cartItems.filter(
        item =>
          !(item.id === itemId && item.color === color && item.size === size)
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    },
    [cartItems]
  );

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart }),
    [cartItems, addToCart, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
