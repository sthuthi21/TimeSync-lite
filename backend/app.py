from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

@app.route('/')
def home():
    return "Flask is running!"

@app.route('/generate-timetable', methods=['POST'])
def generate_timetable():
    data = request.json  # Get data from frontend/Postman
    tasks = data.get("tasks", [])
    priority = data.get("priority", "High")
    available_time = data.get("available_time", "09:00-21:00")
    break_preferences = data.get("break_preferences", "Every 1 hour")
    #break time um add aakane pls

    # Placeholder logic for now
    #timetable = [{"time": "09:00", "task": task["name"]} for task in tasks]
    
    #Placeholder logic - real
    

    return jsonify({"timetable": timetable})

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
