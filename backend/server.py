from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# Allow React to talk to this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store logs in memory
global_state = {
    "status": "SECURE",
    "logs": [],
    "agent_activity": "System Idle..."
}

class LogUpdate(BaseModel):
    message: str
    type: str
    ip: str
    agent_msg: str = ""

@app.get("/status")
def get_status():
    return global_state

@app.post("/log")
def add_log(update: LogUpdate):
    # Add new log to the top
    new_log = {
        "id": len(global_state["logs"]) + 1,
        "timestamp": "Now",
        "message": update.message,
        "type": update.type,
        "ip": update.ip
    }
    global_state["logs"].insert(0, new_log)
    global_state["logs"] = global_state["logs"][:8] # Keep last 8
    
    # Update Status if it's a threat
    if update.type == "danger":
        global_state["status"] = "THREAT DETECTED"
    
    # Update Agent Chat
    if update.agent_msg:
        global_state["agent_activity"] = update.agent_msg
        
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)