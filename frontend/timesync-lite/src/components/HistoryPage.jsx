/*import React, { useState , useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

/*const HistoryPage = () => {
  const [history, setHistory] = useState([
    { time: "09:00 - 10:30", task: "Project Planning", priority: "High", date: "2025-02-01" },
    { time: "10:30 - 11:00", task: "Break", priority: "-", date: "2025-02-01" },
    { time: "11:00 - 12:30", task: "Client Meeting", priority: "Medium", date: "2025-02-02" },
  ]);

  const [filterPriority, setFilterPriority] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  const handleClearHistory = () => {
    setHistory([]);
  };

  const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [filterPriority, setFilterPriority] = useState("All");
    const [filterDate, setFilterDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // ✅ Fetch history from Flask backend
    useEffect(() => {
      fetch("http://127.0.0.1:5001/history")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch history");
          }
          return response.json();
        })
        .then((data) => {
          setHistory(data.history || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching history:", error);
          setError("Failed to fetch history.");
          setLoading(false);
        });
    }, []);

    const handleClearHistory = () => {
      setHistory([]);

  // Filtered History Logic
  const filteredHistory = history.filter((task) => {
    const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
    const matchesDate = !filterDate || task.date === filterDate;
    return matchesPriority && matchesDate;
  });

  return (
    <>
    <Header/>
    <div className="history-page">
      <h2>Task History</h2>
      {/* Loading & Error Handling *}
      {loading && <p>Loading history...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Filters *}
      <div className="filters">
        <label>
          Priority:
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          Date:
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
      </div>

      {/* History Table *}
      <table className="history-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((task, index) => (
              <tr key={index}>
                <td>{task.time}</td>
                <td>{task.task}</td>
                <td>{task.priority}</td>
                <td>{task.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Clear History Button *}
      <button className="clear-history-btn" onClick={handleClearHistory}>
        Clear History
      </button>
    </div>
    <Footer/>
    </>
  );
};

export default HistoryPage;
*/

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch history from Flask backend
  /*useEffect(() => {
    fetch("http://127.0.0.1:5001/history")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }
        return response.json();
      })
      .then((data) => {
        setHistory(data.history || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        setError("Failed to fetch history.");
        setLoading(false);
      });
  }, []);*/

  useEffect(() => { 
    fetch("http://127.0.0.1:5001/history")
      .then((response) => response.json())
      .then((data) => {
        console.log("History data:", data);
        setHistory(data.history);
      })
      .catch((error) => console.error("Error fetching history:", error));
  }, []);
  

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Filtered History Logic
  const filteredHistory = history.filter((task) => {
    const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
    const matchesDate = !filterDate || task.date === filterDate;
    return matchesPriority && matchesDate;
  });

  return (
    <>
      <Header />
      <div className="history-page">
        <h2>Task History</h2>
        {/* Loading & Error Handling
        {loading && <p>Loading history...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>} */}

        {/* Filters */}
        <div className="filters">
          <label>
            Priority:
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>

          <label>
            Date:
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </label>
        </div>

        {/* History Table */}
        {/*<table className="history-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Task</th>
              <th>Priority</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((task, index) => (
                <tr key={index}>
                  <td>{task.time}</td>
                  <td>{task.task}</td>
                  <td>{task.priority}</td>
                  <td>{task.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        */}

        {/* Scrollable History Table */}
      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Task</th>
              <th>Priority</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((task, index) => (
                <tr key={index}>
                  <td>{task.time}</td>
                  <td>{task.task}</td>
                  <td>{task.priority}</td>
                  <td>{task.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

        {/* Clear History Button */}
        <button className="clear-history-btn" onClick={handleClearHistory}>
          Clear History
        </button>
      </div>
      <Footer />
    </>
  );
};

// Place the export statement at the end
export default HistoryPage;
