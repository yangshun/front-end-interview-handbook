import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import ProductListingPage from 'src/pages/ProductListing';
import ProductDetailPage from './pages/ProductDetail';

import ToastContextProvider from './context/ToastContext';
import LatestArrivalsPage from './pages/LatestArrivals';
import CartContextProvider from './context/CartContext';

function App() {
  return (
    <ToastContextProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/latest" element={<LatestArrivalsPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
          </Route>
        </Routes>
      </CartContextProvider>
    </ToastContextProvider>
  );
}

export default App;
