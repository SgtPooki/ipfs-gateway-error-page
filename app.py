from flask import Flask, render_template

app = Flask(__name__)

# Default route
@app.route('/')
def home():
    return render_template('504.html.j2')

if __name__ == '__main__':
    app.run(debug=True)
