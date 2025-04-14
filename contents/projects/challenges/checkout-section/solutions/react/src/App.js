import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';

import CartContextProvider from './context/CartContext';
import ToastContextProvider from './context/ToastContext';

function App() {
  return (
    <ToastContextProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </CartContextProvider>
    </ToastContextProvider>
  );
}

export default App;
