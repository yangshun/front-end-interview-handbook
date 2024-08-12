import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import CartPage from './pages/Cart';

import CartContextProvider from './context/CartContext';

function App() {
  return (
    <CartContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<CartPage />} />
        </Route>
      </Routes>
    </CartContextProvider>
  );
}

export default App;
