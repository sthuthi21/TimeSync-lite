import React from "react";

const Header = () => {
  return (
    <header className="app-header">
        <div className="logo">
          <h1>TimeSync Lite</h1>
        </div>
        <nav className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#history">History</a>
          <a href="#settings">Settings</a>
        </nav>
      </header>
  );
};

export default Header;
