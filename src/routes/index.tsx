import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/Home';
import { ShopPage } from '../pages/Shop';
import { ProductPage } from '../pages/Product';
import { CollectionPage } from '../pages/Collection';
import { WishlistPage } from '../pages/Wishlist';
import { CartPage } from '../pages/Cart';
import { AboutPage } from '../pages/About';
import { NotFoundPage } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'product/:slug', element: <ProductPage /> },
      { path: 'collection/:slug', element: <CollectionPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
