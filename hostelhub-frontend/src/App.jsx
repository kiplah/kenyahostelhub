import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HostelExplore from "./pages/HostelExplore";
import HostelDetail from "./pages/HostelDetail"; 
import Navbar from "./components/Navbar";
import PostHostel from "./pages/PostHostel";
import PremiumListing from './pages/PremiumListing';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "keen-slider/keen-slider.min.css";
import About from "./pages/About";
import Contact from "./pages/contact";
import API from "./services/api"; // Ensure this is correctly set up
import "./App.css"; // Import your global styles
import "./index.css"; // Import Tailwind CSS styles



export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hostels" element={<HostelExplore />} />
        <Route path="/hostels/:id" element={<HostelDetail />} /> {/* ✅ dynamic route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-hostel-start" element={<PostHostel />} /> 
        <Route path="/premium-listing" element={<PremiumListing />} /> 
        <Route path="/about" element={<About />} />   
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </Router>
  );
}
