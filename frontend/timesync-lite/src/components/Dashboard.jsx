import React, { useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { time: "09:00 - 10:30", task: "Project Planning", priority: "High" },
    { time: "10:30 - 11:00", task: "Break", priority: "-" },
    { time: "11:00 - 12:30", task: "Client Meeting", priority: "Medium" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("High");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { time: "To be scheduled", task: newTask, priority: newPriority },
      ]);
      setNewTask(""); // Clear the input field
    }
  };

  const handleDeleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="dashboard-container">
      {/* Left Section: Form */}
      <div className="schedule-form">
        <h2>Create Your Schedule</h2>
        <div className="form-group">
          <label>Available Time Slot</label>
          <div className="time-input">
            <input type="time" defaultValue="09:00" />
            <input type="time" defaultValue="17:00" />
          </div>
        </div>
        <div className="form-group">
          <label>Tasks</label>
          <div className="task-input">
            <input
              type="text"
              placeholder="Enter task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button onClick={handleAddTask}>+</button>
          </div>
        </div>

        {/* Show Added Tasks */}
        <div className="added-tasks">
          <h3>Tasks Added</h3>
          <div className="task-list">
            {tasks.map((task, index) => (
              <div key={index} className="task-item">
                <span>{task.task}</span>
                <span className="priority">{task.priority}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Break Preferences */}
        <label>Break Preferences</label>
        <div className="break-preferences">
          <div>
            <label htmlFor="break-time">When?</label>
            <select id="break-time">
              <option>Every 1 hour</option>
              <option>Every 2 hours</option>
              <option>Every 3 hours</option>
            </select>
          </div>
          <div>
            <label htmlFor="break-period">Period</label>
            <select id="break-period">
              <option>5 minutes</option>
              <option>10 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Section: Schedule Table */}
      <div className="schedule-table">
        <h2>Your Schedule</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Task</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.time}</td>
                <td>{task.task}</td>
                <td>{task.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
