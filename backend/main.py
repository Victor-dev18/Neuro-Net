import colorama
import time
import requests # <--- New
from colorama import Fore, Style
from actor_agent import get_honeypot_response
from analyst_agent import analyze_threat

colorama.init(autoreset=True)
SERVER_URL = "http://localhost:8000/log"

def send_to_dashboard(message, type="success", ip="192.168.1.55", agent_msg=""):
    try:
        requests.post(SERVER_URL, json={
            "message": message,
            "type": type,
            "ip": ip,
            "agent_msg": agent_msg
        })
    except:
        pass # If dashboard is closed, don't crash

print(Fore.CYAN + "   NEURO-NET: ACTIVE DECEPTION SYSTEM ONLINE")
print(Fore.YELLOW + "[WAITING] Listening for incoming connections...\n")

# Initial "Connected" Log
send_to_dashboard("New SSH Connection Established", "success", "192.168.1.55", "Agent_1: Initiating Honeypot Protocol...")

while True:
    try:
        user_input = input(Fore.WHITE + "root@secure-cam:~# ")
        if user_input.lower() in ['exit', 'quit']:
            break

        # 1. ACTOR
        fake_output = get_honeypot_response(user_input)
        print(Fore.WHITE + fake_output)
        
        # Send Actor activity to dashboard
        send_to_dashboard("Command Processed: " + user_input, "success", "192.168.1.55", f"Agent_1: Simulating output for '{user_input}'")
        
        time.sleep(1) 

        # 2. ANALYST
        threat_data = analyze_threat(user_input)
        
        if threat_data['action'] == "BLOCK_IP":
            print(Fore.RED + " [ACTION] CRITICAL THREAT. IP BLOCKED.")
            # Send BLOCK signal to dashboard
            send_to_dashboard(f"Threat Detected: {threat_data['intent']}", "danger", "192.168.1.55", f"Agent_2: {threat_data['intent']} Detected. Blocking IP.")
            break 
        else:
            print(Fore.GREEN + " [ACTION] Monitoring continued...")
            # Send Monitor signal
            send_to_dashboard("Traffic Analysis: HARMLESS", "success", "192.168.1.55", f"Agent_2: Analysis complete. Risk Score: {threat_data['risk_score']}")
        
        time.sleep(1)

    except KeyboardInterrupt:
        break