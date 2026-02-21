# Google-App-Script

function data(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // send data
  sheet.getRange('A1').setValue('UAP');
  sheet.getRange('B1').setValue('EEE');
  sheet.getRange('C1').setValue('PAC');
  sheet.getRange('A2').setValue('EMON');
  sheet.getRange('B2').setValue('Hi');
  sheet.getRange('C2').setValue('BOAT');
}







function data(){
  // 0 = first sheet, 1 = second sheet (Sheet2)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
  
  sheet.getRange('A1').setValue('EMON');
  sheet.getRange('B1').setValue('E');
  sheet.getRange('C1').setValue('EEE');
  sheet.getRange('A2').setValue('B');
  sheet.getRange('B2').setValue('C');
  sheet.getRange('C2').setValue('B');
}







Wireless Data send From ESP 32 to Google Sheet Through Google App Script

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




ESP 32 Code:
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Galaxy S10+";          
const char* password = "12345678";         
String GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxc4-U5rj-YgNVe8wjiAMjxttmIks3OrxSvTAi6_nV33S9zZFmd9pcb8Luib-SSOQjx/exec";

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  Serial.print("WiFi connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    String url = GOOGLE_SCRIPT_URL + "?message=EMON";
    
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
  } else {
    Serial.println("WiFi disconnected");
  }
  
  delay(5000); 
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


