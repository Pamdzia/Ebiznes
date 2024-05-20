from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

client = OpenAI(
    base_url='http://localhost:11434/v1/',
    api_key='ollama', 
)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('content', 'Hello, how are you?') 
    chat_completion = client.chat.completions.create(
        messages=[
            {
                'role': 'user',
                'content': user_message,
            }
        ],
        model='llama2',
    )
    response_content = chat_completion.choices[0].message.content
    return jsonify(response=response_content)

if __name__ == '__main__':
    app.run(port=5000)
