import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Stand Fiandeiro</div>
      <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/catalog">Catálogo</Link>
        <Link to="/about">Sobre</Link>
        <Link to="/contact">Contactos</Link>
      </div>
    </nav>
  );
};

export default Navbar;
