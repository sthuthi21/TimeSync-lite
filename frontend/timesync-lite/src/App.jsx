import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HistoryPage from "./components/HistoryPage";
import LoginPage from "./components/LoginPage";
import './App.css';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  </Router>
);

export default App;
