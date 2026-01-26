import os
import google.generativeai as genai
import json
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

ANALYST_SYSTEM_PROMPT = """
You are a Cybersecurity Threat Analyst AI.
JOB: Analyze the command typed by a user in a terminal and determine their intent.

OUTPUT FORMAT: Return ONLY a JSON object. No markdown.
{
  "risk_score": (Integer 0-100),
  "intent": (One of: "RECONNAISSANCE", "EXPLOITATION", "DATA_THEFT", "HARMLESS"),
  "analysis": (One short sentence explaining why),
  "action": (One of: "MONITOR", "BLOCK_IP")
}
"""

model = genai.GenerativeModel('gemini-flash-latest', system_instruction=ANALYST_SYSTEM_PROMPT)

def analyze_threat(command):
    try:
        response = model.generate_content(command)
        clean_text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(clean_text)
    except Exception as e:
        # PRINT THE ERROR SO WE CAN SEE IT
        print(f"DEBUG: Analyst Error -> {e}") 
        return {"risk_score": 0, "intent": "UNKNOWN", "action": "MONITOR"}