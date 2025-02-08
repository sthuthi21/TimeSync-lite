import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

MONGO_URI = os.getenv("MONGO_URI")  # Get MongoDB URI from environment variable

client = MongoClient(MONGO_URI)
db = client["timesync_db"]
history_collection = db["history"]
'''
history_collection.insert_one({
    "tasks": [{"name": "Test Task", "priority": "High"}],
    "available_time": ["09:00", "12:00"],
    "break_preferences": "Every 1 hour",
    "break_period": "15 minutes",
    "timetable": [
        {"time": "09:00 - 10:00", "task": "Test Task", "priority": "High"}
    ]
})

print("✅ Test data inserted!")
'''

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Enable cross-origin requests

@app.route('/')
def home():
    return "Flask is running!"

#Dashboard
@app.route('/generate-timetable', methods=['POST'])
def generate_timetable():
    data = request.json  
    tasks = data.get("tasks", [])
    available_time = data.get("available_time", ["09:00", "21:00"])
    duration = data.get("duration", "1h 00m")
    break_preferences = data.get("break_preferences", "Every 1 hour")
    break_period = data.get("break_period", "15 minutes")

    for task in tasks:
        if "duration" not in task or not task["duration"].strip():
            task["duration"] = "1h 00m"

    if not isinstance(available_time, list) or len(available_time) != 2:
        available_time = ["09:00", "21:00"]

    timetable = schedule_tasks(tasks, available_time, break_preferences, break_period)

    # ✅ Store in MongoDB
    history_collection.insert_one({
        "tasks": tasks,
        "available_time": available_time,
        "break_preferences": break_preferences,
        "break_period": break_period,
        "timetable": timetable
    })

    return jsonify({"timetable": timetable})

# ✅ Corrected schedule_tasks function
def schedule_tasks(tasks, available_time, break_preferences, break_period):
    start_time, end_time = available_time  # Extract start & end times

    # Convert time to minutes for calculations
    from datetime import datetime, timedelta

    def time_to_minutes(t):
        return int(t.split(":")[0]) * 60 + int(t.split(":")[1])

    def minutes_to_time(m):
        return f"{m//60:02d}:{m%60:02d}"
    
    def parse_duration(duration_str):
        """ Convert '1h 30m' format to minutes """
        import re
        match = re.match(r"(?:(\d+)h\s*)?(?:(\d+)m)?", duration_str)
        if match:
            hours = int(match.group(1)) if match.group(1) else 0
            minutes = int(match.group(2)) if match.group(2) else 0
            return hours * 60 + minutes
        return 60  # Default to 60 min if format is invalid

    def get_status(start_time, end_time):
        now = datetime.now().strftime("%H:%M")  
        now_minutes = time_to_minutes(now)
        start_minutes = time_to_minutes(start_time)
        end_minutes = time_to_minutes(end_time)

        if now_minutes < start_minutes:
            return "Upcoming"
        elif start_minutes <= now_minutes <= end_minutes:
            return "Ongoing"
        else:
            return "Completed"

    current_time = time_to_minutes(start_time)
    end_time_minutes = time_to_minutes(end_time)

    priority_order = {"High": 1, "Medium": 2, "Low": 3, "Break": 4}
    sorted_tasks = sorted(tasks, key=lambda t: (priority_order.get(t["priority"], 4), tasks.index(t)))

    timetable = []
    break_interval = {"Every 1 hour": 60, "Every 2 hours": 120, "Every 3 hours": 180}.get(break_preferences, 60)
    break_duration = int(break_period.split()[0]) if break_period.split()[0].isdigit() else 15  # Default: 15 min

    next_break_time = current_time + break_interval  # Set first break time

    for task in sorted_tasks:
        if current_time >= end_time_minutes:
            break  # Stop if out of time

        task_duration = parse_duration(task.get("duration", "1h 00m"))

        while task_duration > 0:
            if current_time >= end_time_minutes:
                break  # Stop if out of time

            # Insert break if it's time
            if current_time >= next_break_time:
                break_end_time = current_time + break_duration
                if break_end_time <= end_time_minutes:  # Ensure break fits in schedule
                    timetable.append({
                        "time": f"{minutes_to_time(current_time)} - {minutes_to_time(break_end_time)}",
                        "task": "Break",
                        "priority": "-",
                        "duration": f"{break_duration}m"
                        #"status": get_status(minutes_to_time(current_time), minutes_to_time(break_end_time))
                    })
                    current_time = break_end_time  # Move past break time
                    next_break_time = current_time + break_interval  # Schedule next break

            # Assign task time
            task_end_time = min(current_time + task_duration, next_break_time)
            allocated_duration = task_end_time - current_time  # Duration of this task chunk

            timetable.append({
                "time": f"{minutes_to_time(current_time)} - {minutes_to_time(task_end_time)}",
                "task": task["name"],
                "priority": task["priority"],
                "duration": f"{allocated_duration}m"
                #"status": get_status(minutes_to_time(current_time), minutes_to_time(break_end_time))  # ✅ Ensure proper syntax
            })


            task_duration -= allocated_duration  # Reduce remaining task duration
            current_time = task_end_time  # Move forward

    return timetable
#History
@app.route('/history', methods=['GET'])
def get_history():
    try:
        history = list(history_collection.find({}, {"_id": 0}))  # Fetch history
        print("✅ History fetched successfully")
        return jsonify({"history": history})
    except Exception as e:
        print(f"❌ Error fetching history: {e}")
        return jsonify({"error": "Failed to fetch history", "message": str(e)}), 500

def list_routes():
    import urllib
    output = []
    for rule in app.url_map.iter_rules():
        methods = ','.join(rule.methods)
        line = urllib.parse.unquote(f"{rule.endpoint:20s} {methods:25s} {rule}")
        output.append(line)
    print("\n".join(output))

if __name__ == '__main__':
    list_routes()
    app.run(debug=True, host='0.0.0.0', port=5001)
