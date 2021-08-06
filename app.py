from flask import Flask, request

app = Flask(__name__)


@app.route('/email', methods=['POST'])
def receive_email():
    print('From:', request.form['from'])
    print('To:', request.form['to'])
    print('Subject:', request.form['subject'])
    print('Body:', request.form['text'])
    print('HTML:', request.form['html'])
    return ''

if __name__ == "__main__":
    app.run()