import React, { useState } from "react";

const HistoryPage = () => {
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

  // Filtered History Logic
  const filteredHistory = history.filter((task) => {
    const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
    const matchesDate = !filterDate || task.date === filterDate;
    return matchesPriority && matchesDate;
  });

  return (
    <div className="history-page">
      <h2>Task History</h2>

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

      {/* Clear History Button */}
      <button className="clear-history-btn" onClick={handleClearHistory}>
        Clear History
      </button>
    </div>
  );
};

export default HistoryPage; 


