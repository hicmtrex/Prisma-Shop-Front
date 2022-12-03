import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import MainLayout from '../layouts/main/MainLayout';
import Auth from '../pages/Auth/Auth';
import DashboardHome from '../pages/Dashboard/DashboardHome';
import OrdersList from '../pages/Dashboard/Orders/OrdersList';
import EditProduct from '../pages/Dashboard/Products/EditProduct';
import ProductsList from '../pages/Dashboard/Products/ProductsList';
import EditUser from '../pages/Dashboard/Users/EditUser';
import UsersList from '../pages/Dashboard/Users/UsersList';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/Main/About/AboutPage';
import OrderDetails from '../pages/Main/OrderDetails';
import ProductDetails from '../pages/Main/Products/ProductDetails';
import Products from '../pages/Main/Products/Products';
import UserProfile from '../pages/Main/Profile/UserProfile';
import CartPage from '../pages/Main/Shop/CartPage';
import PlaceOrder from '../pages/Main/Shop/Placeorder';
import ShippingAddress from '../pages/Main/Shop/ShippingAddress';
import ProtectedRoutes from './ProtectedRoutes';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/auth' element={<Auth />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/profile/:id' element={<UserProfile />} />
            <Route path='/orders/:id' element={<OrderDetails />} />
          </Route>
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/address' element={<ShippingAddress />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Route>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path='product-list' element={<ProductsList />} />
          <Route path='product-edit/:id' element={<EditProduct />} />
          <Route path='user-edit/:id' element={<EditUser />} />
          <Route path='user-list' element={<UsersList />} />
          <Route path='order-list' element={<OrdersList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
