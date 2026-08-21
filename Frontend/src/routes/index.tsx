import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/Home';
import { ShopPage } from '../pages/Shop';
import { ProductPage } from '../pages/Product';
import { CollectionPage } from '../pages/Collection';
import { CollectionsPage } from '../pages/Collections';
import { WishlistPage } from '../pages/Wishlist';
import { CartPage } from '../pages/Cart';
import { AboutPage } from '../pages/About';
import { NotFoundPage } from '../pages/NotFound';
import { LoginPage } from '../pages/Login';
import { AdminLayout } from '../pages/Admin/AdminLayout';
import { AdminGuard } from '../pages/Admin/AdminGuard';
import { AdminDashboard } from '../pages/Admin/Dashboard';
import { AdminOrders } from '../pages/Admin/Orders';
import { AdminOrderDetail } from '../pages/Admin/OrderDetail';
import { AdminProducts } from '../pages/Admin/Products';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'product/:slug', element: <ProductPage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: 'collection/:slug', element: <CollectionPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminGuard><AdminLayout /></AdminGuard>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'orders/:id', element: <AdminOrderDetail /> },
      { path: 'products', element: <AdminProducts /> },
    ],
  },
]);
