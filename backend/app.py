from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os

from openai import OpenAI


app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_msg = data.get("message")

        print("User message:", user_msg)

        response = client.chat.completions.create(
            model="groq/compound",
            messages=[{"role": "user", "content": user_msg}]
        )

        reply = response.choices[0].message.content
        return jsonify({"reply": reply})

    except Exception as e:
        print("FULL ERROR:", e)
        return jsonify({"reply": "Backend error"}), 500

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)