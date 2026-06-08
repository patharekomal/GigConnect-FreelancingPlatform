import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// import ClientDashboard from "./pages/ClientDashboard";
// import FreelancerDashboard from "./pages/FreelancerDashboard";

function App() {
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password"  element={<ResetPassword />} />
        {/* <Route path="/client" element={<ClientDashboard />} />
        <Route path="/freelancer" element={<FreelancerDashboard />} /> */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;