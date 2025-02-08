import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">TimeSync Lite</h1>
      </div>
      <nav className="header-right">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/history" className="nav-link">History</Link>
        <Link to="/" className="nav-link">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;
 

