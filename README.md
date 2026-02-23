# Google-App-Script
//Send data Active Sheet:
function doGet() {
  data();  // Call your data function
  return ContentService.createTextOutput();  // Empty
}

function data() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange("A1").setValue("UAP");
  sheet.getRange("B1").setValue("EEE");
  sheet.getRange("C1").setValue("PAC");
  sheet.getRange("A2").setValue("ESP 32");
  sheet.getRange("B2").setValue("Arduino");
  sheet.getRange("C2").setValue("Raspberry Pi");
}






//Send Data "Actual" Sheet:
function doGet() {
  data();
  return ContentService.createTextOutput();
}

function data() {
  // Change "MySheet" to your actual sheet name
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
  
  sheet.getRange("A1").setValue("UAP");
  sheet.getRange("B1").setValue("EMON");
  sheet.getRange("C1").setValue("PAC");
  sheet.getRange("A2").setValue("ESP 32");
  sheet.getRange("B2").setValue("Arduino");
  sheet.getRange("C2").setValue("Raspberry Pi");
}












Wireless Data send From ESP 32 to Google Sheet Through Google App Script:

App Script Code:
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Time', 'Data']);
  }
  
  var params = e.parameter;
  var message = params.message; 
  
  sheet.appendRow([new Date(), message]);
  
  return ContentService.createTextOutput("Data logged: " + message);
}



ESP 32 Code:(Send Data One Time Only)

#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Galaxy S10+";
const char* pass = "12345678";

//Web App URL)
String url = "https://script.google.com/macros/s/AKfycbxF90dwJWy-Dr0q9GC8fneipozRGe59UCRxwVbkHApGiBdRY0GO-j1uqDpVohjynPEc/exec?message=EMON";

void setup() {
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) delay(1000);
  
  HTTPClient http;
  http.begin(url);
  http.GET();
  http.end();
}

void loop() {}




ESP 32 Code:(Contious Data Transfer)
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Galaxy S10+";
const char* pass = "12345678";

// Web App URL
String url = "https://script.google.com/macros/s/AKfycbxF90dwJWy-Dr0q9GC8fneipozRGe59UCRxwVbkHApGiBdRY0GO-j1uqDpVohjynPEc/exec?message=EMON";

void setup() {
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) delay(1000);
}

void loop() {
  HTTPClient http;
  http.begin(url);
  http.GET();
  http.end();
  
  delay(1000); 
}


















New version:
Send Sensor Data:

GOOGLE APP SCRIPT CODE
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Time', 'Data']);
  }
  
  
  var params = e.parameter;
  var message = params.message; 
  
  
  sheet.appendRow([new Date(), message]);
  
  
  return ContentService.createTextOutput("Data logged: " + message);
}


ESP 32 CODE:
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Galaxy S10+";          
const char* password = "12345678";         
String GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxc4-U5rj-YgNVe8wjiAMjxttmIks3OrxSvTAi6_nV33S9zZFmd9pcb8Luib-SSOQjx/exec";

// IR Sensor pin
const int irSensorPin = 18;

void setup() {
  Serial.begin(115200);
  pinMode(irSensorPin, INPUT_PULLUP);
  
  // WiFi connection
  WiFi.begin(ssid, password);
  Serial.print("WiFi connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
}

void loop() {
  int sensorValue = digitalRead(irSensorPin);
  String messageToSend = "";
  
  
  if (sensorValue == LOW) {
    messageToSend = "DETECTED";
    Serial.println("✅ Object Detected! : DETECTED");
  } else {
    messageToSend = "NOTDETECTED";
    Serial.println("❌ No Object! : NOT DETECTED");
  }
  
  
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = GOOGLE_SCRIPT_URL + "?message=" + messageToSend;
    
    Serial.println("Sending: " + url);
    http.begin(url);
    int httpCode = http.GET();
    
    if (httpCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
    } else {
      Serial.println("Error: " + String(httpCode));
    }
    http.end();
  }
  
  delay(100); 
}


