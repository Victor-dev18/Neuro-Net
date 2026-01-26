# 🛡️ NEURO-NET: Autonomous Deception & Self-Healing Defense for IoT

>
> A decentralized, agentic security gateway that uses Multi-Agent AI to detect, deceive, and neutralize Zero-Day threats in real-time.

---

## 💡 The Problem

Traditional firewalls are **reactive**—they only block known signatures. Once a hacker bypasses the router, they have unrestricted access to smart home devices.

**Neuro-Net introduces Active Defense**, shifting the paradigm from **Passive Blocking** to **Active Deception**.

---

## 🚀 System Architecture

Neuro-Net operates on a three-tier architecture connecting Physical Edge devices to Cloud Intelligence.

*(Add IoT architecture diagram here)*

### Layers:

1. **Physical Layer (Edge)**
   ESP32 NodeMCU sensors detect physical tampering or unauthorized port access.

2. **Intelligence Layer (Gateway)**
   A Python FastAPI server orchestrates two Gemini 1.5 Agents:

   * **The Actor (Decoy):** Hallucinates a vulnerable Linux Kernel to trap attackers.
   * **The Analyst (Sentinel):** Analyzes intent and autonomously patches firewall rules.

3. **Visualization Layer (SOC)**
   A React + Tremor Dashboard provides real-time threat monitoring and device control.

---

![Dashboard Screenshot](assets/dashboard_preview.png)


🛠️ Tech Stack

| Component    | Technology        | Description                                |
| ------------ | ----------------- | ------------------------------------------ |
| **Hardware** | ESP32 NodeMCU     | Edge sensor for physical tamper detection  |
| **Backend**  | Python (FastAPI)  | Async event handling & Bridge Server       |
| **AI Core**  | Google Gemini 1.5 | Agentic workflow (Deception & Analysis)    |
| **Frontend** | React.js + Tremor | Dark-mode Security Operations Center (SOC) |
| **Comms**    | HTTP / REST       | Low-latency communication protocol         |

---

## ⚡ How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Victor-dev18/Neuro-Net.git
cd Neuro-Net
```

### 2. Setup Backend (The Brain)

```bash
cd backend
pip install -r requirements.txt
# Create a .env file and add: GEMINI_API_KEY="your_key_here"
python server.py
```

### 3. Setup Frontend (The Dashboard)

```bash
cd dashboard
npm install
npm run dev
```

### 4. Hardware Setup (Optional)

Upload the code in:

```
firmware/ESP32_Node.ino
```

Update the `serverUrl` in the sketch to match your laptop's IP address.

Press the **BOOT** button on the ESP32 to trigger a **Physical Tamper Alert**.

---

##

---

## 🚀 GitHub Upload (Initial Setup)

```bash
git init
git add .
git commit -m "Initial Release: Neuro-Net Full Stack IoT Security"
```

---

### ⭐ If you like this project, give it a star and feel free to contribute!
