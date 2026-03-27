from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os

app = Flask(__name__)
CORS(app)

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/")
def home():
    return "Backend is running 🚀"

@app.route("/chat", methods=["POST"])
def chat():
    try:
        # Safe JSON handling
        data = request.get_json() or {}
        user_msg = data.get("message", "").strip()

        if not user_msg:
            return jsonify({"reply": "Please enter a message"}), 400

        print("User message:", user_msg)

        # Groq API call
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",   # ✅ stable working model
            messages=[
                {"role": "user", "content": user_msg}
            ]
        )

        reply = response.choices[0].message.content

        return jsonify({"reply": reply})

    except Exception as e:
        import traceback
        traceback.print_exc()  # shows full error in Render logs
        return jsonify({"reply": f"Error: {str(e)}"}), 500


# Render port binding
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)