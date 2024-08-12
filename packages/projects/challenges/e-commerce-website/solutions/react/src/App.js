import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import OrderSuccessPage from './pages/OrderSuccess';
import StorefrontPage from './pages/Storefront';
import ProductListingPage from './pages/ProductListing';
import LatestArrivalsPage from './pages/LatestArrivals';
import ProductDetailPage from './pages/ProductDetail';

import CartContextProvider from './context/CartContext';
import ToastContextProvider from './context/ToastContext';

function App() {
  return (
    <ToastContextProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<StorefrontPage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/latest" element={<LatestArrivalsPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Route>
        </Routes>
      </CartContextProvider>
    </ToastContextProvider>
  );
}

export default App;
