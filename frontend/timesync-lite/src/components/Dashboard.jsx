import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState([]);
  const [availableStart, setAvailableStart] = useState("09:00");
  const [availableEnd, setAvailableEnd] = useState("17:00");
  const [breakPreferences, setBreakPreferences] = useState("Every 1 hour");
  const [breakPeriod, setBreakPeriod] = useState("10 minutes");
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("High");
  const [newDuration, setNewDuration] = useState("");
  const [generatedTimetable, setGeneratedTimetable] = useState([]);

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== "" && newDuration.trim() !== "") {
      setTasks([
        ...tasks,
        { time: "To be scheduled", task: newTask, priority: newPriority, duration: newDuration },
      ]);
      setNewTask("");
      setNewDuration("");
    } else {
      alert("Please fill out both task and duration!");
    }
  };

  const handleDeleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  /*const handleGenerateTimetable = () => {
    let startTime = "09:00"; // Default start time
    const updatedTimetable = tasks.map((task) => {
      const [hours, minutes] = startTime.split(":").map(Number); // Split and convert startTime
      const durationMatch = task.duration.match(/(\d+)h\s*(\d*)m?/); // Regex to extract hours and minutes from duration
  
      if (!durationMatch) {
        return { ...task, time: "Invalid Duration" }; // Handle invalid duration format
      }
  
      const durationHours = parseInt(durationMatch[1] || "0", 10);
      const durationMinutes = parseInt(durationMatch[2] || "0", 10);
  
      const endHours = hours + durationHours + Math.floor((minutes + durationMinutes) / 60);
      const endMinutes = (minutes + durationMinutes) % 60;
  
      const formattedEndTime = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
      const taskTime = `${startTime} - ${formattedEndTime}`;
      startTime = formattedEndTime; // Update start time for the next task
      return { ...task, time: taskTime, startTime, endTime: formattedEndTime };
    });
    setGeneratedTimetable(updatedTimetable);
  };*/

  const handleGenerateTimetable = () => {
    const requestData = {
      tasks: tasks.map((task) => ({
        name: task.task,
        priority: task.priority === "-" ? "Break" : task.priority, // Fix invalid priority
        duration: task.duration,
      })),
      available_time: [availableStart, availableEnd], 
      break_preferences: breakPreferences, 
      break_period: breakPeriod,
    };
  
    fetch("https://timesync-lite.onrender.com/generate-timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Generated Timetable:", data);
        
        if (!Array.isArray(data.timetable)) {
          throw new Error("Timetable response is not an array!");
        }
        
        setGeneratedTimetable(data.timetable); // Ensure it's an array
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred: " + error.message); // Show error in alert
      });
  };
  
  useEffect(() => {
    fetch("https://timesync-lite.onrender.com/history") // Flask backend URL
      .then((response) => response.json())
      .then((data) => setHistory(data.history))
      .catch((error) => console.error("Error fetching history:", error));
  }, []);

  return (
    <>
    <Header/>
    <div className="dashboard-container">
      {/* Left Section: Form */}
      <div className="schedule-form">
        <h2>Create Your Schedule</h2>
        <div className="form-group">
          <label>Available Time Slot</label>
          <div className="time-input">
            <input type="time" value={availableStart} onChange={(e) => setAvailableStart(e.target.value)} />
            <input type="time" value={availableEnd} onChange={(e) => setAvailableEnd(e.target.value)} />
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
            <input
              type="text"
              placeholder="Duration (e.g., 1h 30m)"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
            />
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
                <span className="duration">{task.duration}</span>
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
            <select id="break-time" value={breakPreferences} onChange={(e) => setBreakPreferences(e.target.value)}>
              <option>Every 1 hour</option>
              <option>Every 2 hours</option>
              <option>Every 3 hours</option>
            </select>
          </div>
          <div>
            <label htmlFor="break-period">Period</label>
            <select id="break-period" value={breakPeriod} onChange={(e) => setBreakPeriod(e.target.value)}>
              <option>5 minutes</option>
              <option>10 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
            </select>
          </div>
        </div>

        <button className="generate-btn" onClick={handleGenerateTimetable}>
          Generate Timetable
        </button>
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
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(generatedTimetable) && generatedTimetable.length > 0 ? generatedTimetable : tasks).map((task, index) => (
              <tr key={index}>
                <td>{task.time}</td>
                <td>{task.task}</td>
                <td>{task.priority}</td>
                <td>{task.duration}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;
