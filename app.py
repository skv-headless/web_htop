from flask import Flask, json, render_template
import psutil

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/stats")
def stats():
    processes = []
    for proc in psutil.process_iter():
        try:
            pinfo = proc.as_dict(attrs=['pid', 'name'])
            pinfo['cpu_percent'] = proc.cpu_percent(interval=None)
            pinfo['memory_percent'] = proc.memory_percent()
        except psutil.NoSuchProcess:
            pass
        else:
            processes.append(pinfo)

    return json.dumps({
        'cpu_load': psutil.cpu_percent(interval=None, percpu=True),
        'processes': processes,
        })

if __name__ == "__main__":
    app.run(debug=True)

