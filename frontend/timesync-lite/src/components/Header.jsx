import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <h1>TimeSync Lite</h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/history">History</Link>
      </nav>
    </header>
  );
};

export default Header;
