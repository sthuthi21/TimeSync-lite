import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HistoryPage from "./components/HistoryPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';


const App = () => (
  <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
    <Footer/>
  </Router>
);

export default App;
