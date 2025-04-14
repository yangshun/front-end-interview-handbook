import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import ProductListingPage from 'src/pages/ProductListing';
import ProductDetailPage from './pages/ProductDetail';
import LatestArrivalsPage from './pages/LatestArrivals';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/" element={<LatestArrivalsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
