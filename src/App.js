import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import Homepage from './pages/Homepage';
import AuthProvider, { useAuthContext } from "./context/auth.context";
import CartProvider from "./context/cart.context";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetailsPage";
import MenuAppBar from "./components/Appbar";
import store from './store/store'
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  // TODO : add search and filter functionality 

  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
        </AuthProvider>
    </Provider>
  );
}

function AppRoutes() {
  const { isLoggedIn } = useAuthContext();
  
  return (
    <BrowserRouter>
      <MenuAppBar/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/sign-in" element={isLoggedIn ? <Navigate to='/' /> : <Signin />} />
        <Route path="/sign-up" element={isLoggedIn ? <Navigate to='/' /> : <Signup/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={isLoggedIn ? <CartPage /> : <Navigate to='/sign-in' />} />
        <Route path="/orders" element={isLoggedIn ? <OrdersPage /> : <Navigate to='/sign-in' />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
