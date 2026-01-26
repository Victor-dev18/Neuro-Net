import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Grid, Col, Badge, List, ListItem } from "@tremor/react";
import { ShieldCheckIcon, ExclamationTriangleIcon, VideoCameraIcon, CommandLineIcon } from "@heroicons/react/24/solid";
import { NeuroNetLogo } from "./components/Logo"; // Import your new custom logo

export default function App() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("SECURE");
  const [agentMsg, setAgentMsg] = useState("System Idle. Monitoring traffic...");

  // REAL-TIME CONNECTION TO PYTHON BACKEND
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('http://localhost:8000/status');
        const data = await res.json();
        
        // Update Logs if they exist
        if (data.logs && data.logs.length > 0) {
          setLogs(data.logs);
        }
        
        // Update System Status
        if (data.status) setStatus(data.status);
        
        // Update Agent Chat (The "Brain" Monologue)
        if (data.agent_activity) setAgentMsg(data.agent_activity);

      } catch (e) {
        console.log("Waiting for Python backend...");
      }
    }, 1000); // Poll every 1 second

    return () => clearInterval(interval);
  }, []);

  // UI LOGIC: Determine colors based on Status
  const isSecure = status === "SECURE";
  const statusColor = isSecure ? "emerald" : "rose";
  // If not secure, add a pulsing red glow border
  const borderColor = isSecure ? "border-emerald-500/30" : "border-red-500/80 animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.5)]";

  return (
    <div className="min-h-screen p-6 bg-[#050505] text-white font-mono selection:bg-[#00e1ff] selection:text-black">
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          {/* THE NEW SVG LOGO */}
          <NeuroNetLogo className="h-14 w-14" />
          
          <div>
            <h1 className="text-3xl font-bold tracking-widest text-[#00e1ff]">
              NEURO-NET <span className="text-sm font-normal text-gray-400">| SENTINEL V1.0</span>
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge color={statusColor} size="xl" className="px-4 py-1 text-lg tracking-widest">
            {isSecure ? "SYSTEM NORMAL" : "INTRUSION ALERT"}
          </Badge>
        </div>
      </header>

      {/* --- MAIN DASHBOARD GRID --- */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        
        {/* COLUMN 1: VISUALS (Camera + Status + Agent) */}
        <Col numColSpan={1} numColSpanLg={2}>
          <Grid numItems={1} numItemsSm={2} className="gap-6">
            
            {/* 1. LIVE CAMERA FEED */}
            <Card className={`bg-[#0a0a0a] ring-0 transition-all duration-500 border ${borderColor}`}>
              <div className="flex items-center gap-2 mb-4">
                <VideoCameraIcon className="h-5 w-5 text-[#00e1ff]" />
                <Title className="text-gray-300">Live Camera Feed</Title>
              </div>
              <div className="h-48 bg-gray-900 rounded flex items-center justify-center relative overflow-hidden bg-grid-pattern">
                {/* Recording Dot */}
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] text-red-500">REC</span>
                </div>
                {/* Camera Status Text */}
                <div className={`font-mono text-sm ${isSecure ? "text-gray-500" : "text-red-500 font-bold tracking-widest"}`}>
                  {isSecure ? "[NO SIGNAL - ENCRYPTED]" : "[WARNING: UNAUTHORIZED ACCESS DETECTED]"}
                </div>
              </div>
            </Card>

            {/* 2. IOT DEVICE STATUS */}
            <Card className="bg-[#0a0a0a] border border-[#1f1f1f] ring-0 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheckIcon className="h-5 w-5 text-emerald-400" />
                <Title className="text-gray-300">IoT Device Status</Title>
              </div>
              <div className="space-y-6 mt-6">
                {/* Device 1 */}
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <Text className="text-gray-400">Main Door Lock</Text>
                  <Badge color={isSecure ? "blue" : "rose"} size="sm">
                    {isSecure ? "LOCKED" : "TAMPERED"}
                  </Badge>
                </div>
                {/* Device 2 */}
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <Text className="text-gray-400">Smart Thermostat</Text>
                  <Badge color="blue" size="sm">ACTIVE (24°C)</Badge>
                </div>
                {/* Device 3 */}
                <div className="flex justify-between items-center">
                  <Text className="text-gray-400">CCTV Array</Text>
                  <Badge color="blue" size="sm">ONLINE</Badge>
                </div>
              </div>
            </Card>
          </Grid>

          {/* 3. AGENT NEURAL LINK (The "Brain" Output) */}
          <Card className={`mt-6 bg-[#0a0a0a] ring-0 shadow-2xl transition-all duration-500 border ${isSecure ? "border-[#1f1f1f]" : "border-red-500/50"}`}>
             <div className="flex items-center gap-2 mb-2">
                <ExclamationTriangleIcon className={`h-5 w-5 ${isSecure ? "text-yellow-500" : "text-red-500"}`} />
                <Title className="text-gray-300">Active Agent Neural Link</Title>
              </div>
              <div className="h-32 bg-black rounded p-4 font-mono text-xs overflow-hidden border border-gray-800 relative">
                <p className="text-gray-600 mb-2 italic">// Real-time internal monologue from Gemini 1.5 Agents...</p>
                
                {/* The Typing Text */}
                <p className={`${isSecure ? "text-[#00e1ff]" : "text-red-400"} text-sm`}>
                  {'>'}  {agentMsg}
                </p>

                {/* Critical Alert Override Message */}
                {!isSecure && (
                  <div className="mt-4 p-2 bg-red-900/20 border-l-2 border-red-500 animate-pulse">
                    <p className="text-red-500 font-bold">
                      [!!!] AUTOMATED RESPONSE TRIGGERED: FIREWALL RULE #409 UPDATED.
                    </p>
                  </div>
                )}
              </div>
          </Card>
        </Col>

        {/* COLUMN 2: TERMINAL LOGS (Right Side) */}
        <Col>
          <Card className="h-[550px] bg-[#0a0a0a] border border-[#1f1f1f] ring-0 flex flex-col shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <CommandLineIcon className="h-5 w-5 text-gray-400" />
              <Title className="text-gray-300">Live Network Logs</Title>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <List>
                {logs.map((log) => (
                  <ListItem key={log.id} className="border-b border-gray-800 py-3 hover:bg-white/5 transition-colors">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <Text className="font-mono text-[10px] text-gray-500">{log.timestamp}</Text>
                        <Badge size="xs" color={log.type === "danger" ? "rose" : "blue"}>
                          {log.type === "danger" ? "BLOCKED" : "ALLOW"}
                        </Badge>
                      </div>
                      <Text className={`font-mono text-xs font-bold ${log.type === "danger" ? "text-red-400" : "text-gray-300"}`}>
                        {log.message}
                      </Text>
                      <Text className="font-mono text-[10px] text-gray-600 mt-1">Source: {log.ip}</Text>
                    </div>
                  </ListItem>
                ))}
                
                {logs.length === 0 && (
                  <div className="text-center text-gray-600 mt-10 text-xs animate-pulse">Waiting for incoming traffic...</div>
                )}
              </List>
            </div>
          </Card>
        </Col>
      </Grid>
    </div>
  );
}