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

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="" element={<DashBoard />} />
          </Route>
          <Route path="*" element={<PagenotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
