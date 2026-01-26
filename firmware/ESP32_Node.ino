#include <WiFi.h>
#include <HTTPClient.h>

// --- CONFIGURATION ---
const char* ssid = "YOUR_WIFI_NAME";         // <--- CHANGE THIS
const char* password = "YOUR_WIFI_PASSWORD"; // <--- CHANGE THIS

// REPLACE WITH YOUR LAPTOP'S IP ADDRESS (Keep the :8000/log part)
const char* serverUrl = "http://192.168.1.X:8000/log"; 

// --- PINS ---
#define BUTTON_PIN 0  // Most ESP32s have a "BOOT" button on GPIO 0

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP); // Setup button

  // 1. Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected!");
  
  // 2. Send Initial "Online" Log to Dashboard
  sendLog("ESP32 Device Online", "success", "Hardware_Sensor_01");
}

void loop() {
  // 3. SIMULATE PHYSICAL ATTACK (Press BOOT Button)
  // If you press the BOOT button on the board, it sends a THREAT
  if (digitalRead(BUTTON_PIN) == LOW) {
    Serial.println("Button Pressed! Sending Alert...");
    sendLog("PHYSICAL TAMPER DETECTED", "danger", "Hardware_Sensor_01");
    delay(2000); // Debounce delay
  }
  
  // Keep connection alive
  delay(100);
}

// Function to send data to your Python Server
void sendLog(String message, String type, String deviceId) {
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    // Create JSON Payload
    // Format: {"message": "...", "type": "...", "ip": "..."}
    String jsonPayload = "{\"message\":\"" + message + "\", \"type\":\"" + type + "\", \"ip\":\"" + deviceId + "\"}";
    
    int httpResponseCode = http.POST(jsonPayload);
    
    if(httpResponseCode > 0){
      Serial.print("Sent Log. Response: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
}