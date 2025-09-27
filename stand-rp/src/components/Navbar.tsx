import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__logo">Stand Fiandeiro</div>

      {/* Botão hamburguer */}
      <div 
        className={`navbar__toggle ${isOpen ? "open" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`navbar__links ${isOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/catalog" onClick={() => setIsOpen(false)}>Catálogo</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>Sobre</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contactos</Link>
      </div>
    </nav>
  );
};

export default Navbar;
