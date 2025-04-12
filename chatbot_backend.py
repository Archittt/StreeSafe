from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure the API key
genai.configure(api_key="AIzaSyCI0cha59eogAVTa7zzoQa44h_4dU4wJT8")

# Use the correct model
model = genai.GenerativeModel("gemini-2.0-flash")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_input = data.get("message", "")
        print("Received message:", user_input)

        # Generate response
        response = model.generate_content(user_input)
        print("Gemini response:", response.text)

        return jsonify({"response": response.text})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Something went wrong."}), 500

if __name__ == "__main__":
    app.run(debug=True)
