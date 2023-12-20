from flask import Flask, render_template, jsonify
import subprocess
import time
import threading
from collections import deque
import json

app = Flask(__name__)

speed_data = deque(maxlen=10)

def run_speed_test():
    while True:
        try:
            result_str = subprocess.check_output(["speedtest", "--json"]).decode("utf-8")
            result = json.loads(result_str)

            download_speed = float(result["download"] / 1_000_000)
            upload_speed = float(result["upload"] / 1_000_000)
            ping = float(result["ping"])
            latency = float(result["server"]["latency"])

            speed_data.append((time.time(), download_speed, upload_speed, ping, latency))
            time.sleep(300)  # Run the speed test every 5 minutes
        except Exception as e:
            print(f"Error during speed test: {str(e)}")
            time.sleep(60)  # Wait for 1 minute in case of an error

@app.route('/')
def index():
    return render_template('speed.html')

@app.route('/get_speed')
def get_speed():
    if speed_data:
        latest_speed = speed_data[-1]
        download_speed = latest_speed[1]
        upload_speed = latest_speed[2]
        ping = latest_speed[3]
        latency = latest_speed[4]

        return {
            "download_speed": download_speed,
            "upload_speed": upload_speed,
            "ping": ping,
            "latency": latency,
            "is_fast": download_speed > 50
        }

    return {"error": "No speed test data available"}

if __name__ == '__main__':
    speed_test_thread = threading.Thread(target=run_speed_test)
    speed_test_thread.daemon = True
    speed_test_thread.start()

    app.run(debug=True)