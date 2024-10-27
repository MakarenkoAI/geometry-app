import json

from flask import Flask, request, Response
from flask_cors import CORS

from model_maker import get_response, initialize_model

app = Flask(__name__)
CORS(app)

initialize_model()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("message")
    response = get_response(user_message)
    return Response(json.dumps({"response": response}, ensure_ascii=False), mimetype='application/json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
