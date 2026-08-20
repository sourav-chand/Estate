import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { SearchProvider } from './context/SearchContext';
import { UIProvider } from './context/UIContext';
import { router } from './routes';

export default function App() {
  return (
    <UIProvider>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </UIProvider>
  );
}
