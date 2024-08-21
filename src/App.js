import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/AboutUs";
import PagenotFound from "./Pages/PagenotFound";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import { AuthProvider } from "./Components/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from "./Pages/User/DashBoard";
import PrivateRoute from "./Components/Routes/Private";
import AdminPrivateRoute from "./Components/Routes/AdminRoute";
import AdminDashBoard from "./Pages/Admin/AdminDashBoard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Orders from "./Pages/User/Orders";
import Profile from "./Pages/User/Profile";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import { SearchProvider } from "./Components/searchAuth";
import Search from "./Pages/Search";


function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="user" element={<DashBoard />} />
              <Route path="user/orders" element={<Orders />} />
              <Route path="user/profile" element={<Profile />} />
            </Route>
            <Route path="/dashboard" element={<AdminPrivateRoute />}>
              <Route path="admin" element={<AdminDashBoard />} />
              <Route path="admin/create-category" element={<CreateCategory />} />
              <Route path="admin/create-product" element={<CreateProduct />} />
              <Route path="admin/product/:slug" element={<UpdateProduct />} />
              <Route path="admin/products" element={<Products />} />
              <Route path="admin/users" element={<Users />} />
            </Route>
            <Route path="*" element={<PagenotFound />} />
          </Routes>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
