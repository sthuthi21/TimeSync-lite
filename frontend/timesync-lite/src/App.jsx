import React from "react";
import Header from "./components/Header";
//import TimetableGenerator from "./components/TimetableGenerator";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Dashboard/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
