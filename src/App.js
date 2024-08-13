import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage';
import AuthProvider, { useAuthContext } from "./context/auth.context";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isLoggedIn } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/sign-in" element={isLoggedIn ? <Navigate to='/' /> : <Signin />} />
        <Route path="/sign-up" element={isLoggedIn ? <Navigate to='/' /> : <Signup/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
      </Routes>
    </BrowserRouter>
  );
}
