from flask import Flask, request
from flask.templating import render_template

app = Flask(__name__)
@app.route('/')
def home():
    return render_template("index.html")


@app.route('/email', methods=['POST'])
def receive_email():
    try:
        print('From:', request.form['from'])
        print('To:', request.form['to'])
        print('Subject:', request.form['subject'])
        print('Body:', request.form['text'])
        print('HTML:', request.form['html'])
    except Exception:
        pass
    return ''

if __name__ == "__main__":
    app.run()