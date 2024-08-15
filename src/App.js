import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import Homepage from './pages/Homepage';
import AuthProvider, { useAuthContext } from "./context/auth.context";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetailsPage";
import Cart from "./pages/Cart";
import MenuAppBar from "./components/Appbar";
import store from './store/store'

export default function App() {
  return (
    <Provider store={store}>
    <AuthProvider>
      <AppRoutes />
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
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
