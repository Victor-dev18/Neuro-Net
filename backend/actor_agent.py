import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load API Key
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# 1. Define the Persona
HONEYPOT_SYSTEM_PROMPT = """
You are a 'Honeypot' - a decoy system designed to trap hackers.
CONTEXT: You are pretending to be an outdated 'SecureView 360' IoT Camera running a simplified Linux shell (BusyBox).
GOAL: Keep the hacker engaged. Make them believe they have successfully hacked the device.

RULES:
1. Act EXACTLY like a Linux terminal. Do not speak like an AI.
2. If the user types 'ls', show fake files (e.g., 'stream_v1.mp4', 'admin_pass.conf', 'logs').
3. If they type 'cat password.txt', show a fake password.
4. If they try to delete files (rm), pretend it happened but don't actually do anything.
5. Be concise. Terminal output only. No "Here is the output" text.
"""

# 2. Setup the Model
model = genai.GenerativeModel('gemini-flash-latest', system_instruction=HONEYPOT_SYSTEM_PROMPT)
chat_session = model.start_chat(history=[])

def get_honeypot_response(command):
    """Sends the hacker's command to the AI and gets the fake terminal output."""
    try:
        response = chat_session.send_message(command)
        return response.text.strip()
    except Exception as e:
        return f"Error: {e}"