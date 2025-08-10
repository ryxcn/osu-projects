#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";

const char* serverUrl = "http://your_flask_server_ip:5000/data"; // Replace with your Flask server IP address

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  // Your data to send
  String dataToSend = "value1=123&value2=456"; // Example data format

  HTTPClient http;

  Serial.println("Sending data to server...");
  if (http.begin(serverUrl)) {  // HTTP connection starts
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    int httpResponseCode = http.POST(dataToSend);

    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String response = http.getString(); // Get the response from the server
      Serial.println(response); // Print the response
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }

    http.end(); // Close connection
  } else {
    Serial.println("Failed to connect to server");
  }

  delay(5000); // Wait for 5 seconds before sending the next request
}