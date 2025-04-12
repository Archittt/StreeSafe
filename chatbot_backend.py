import os
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure your API key
genai.configure(api_key="AIzaSyCI0cha59eogAVTa7zzoQa44h_4dU4wJT8")

# Set up generation configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 1024,  # reduced for performance
}

# Keep track of chat history per session
chat_history = []

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    print(f"Received message: {user_message}")  # For logging
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400


    # Add user message to the history
    chat_history.append({"role": "user", "parts": [user_message]})

    try:
        # Generate a response from the model based on the chat history
        response = genai.generate_chat_message(
            messages=chat_history,
            **generation_config
        )

        # Get the model's reply and add it to the chat history
        model_reply = response["candidates"][0]["message"]
        chat_history.append({"role": "bot", "parts": [model_reply]})

        # Return the model's reply
        return jsonify({'reply': model_reply}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)