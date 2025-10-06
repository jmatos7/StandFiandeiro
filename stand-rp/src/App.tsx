import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import StaffLogin from "./pages/StaffLogin";
import './styles/main.scss';

const App: React.FC = () => {
  const [isStaff, setIsStaff] = useState(false);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog userRole={isStaff ? "staff" : "guest"} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {/* Login de staff */}
            <Route
              path="/StaffLogin"
              element={<StaffLogin onLogin={() => setIsStaff(true)} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
