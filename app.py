from flask import Flask, json, render_template
import psutil

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/stats")
def stats():
    return json.dumps({
        'cpu_load': psutil.cpu_percent(interval=1, percpu=True)
        })

if __name__ == "__main__":
    app.run(debug=True)

