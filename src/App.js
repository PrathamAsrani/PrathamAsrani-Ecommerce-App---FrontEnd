import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/AboutUs";
import PagenotFound from "./Pages/PagenotFound";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { AuthProvider } from "./Components/auth";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<PagenotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
