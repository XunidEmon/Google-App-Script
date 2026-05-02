# 📊 Google Apps Script → Google Sheets Data Logger (Serverless API)

## 📌 Overview
This project is a simple **serverless API backend** built using **Google Apps Script**.  
It receives data via HTTP request and stores it directly into **Google Sheets** with timestamp.

This system can be used for IoT, web apps, or any external data logging system.

---

## ⚙️ Features
- ☁️ Fully serverless backend (Google Cloud)
- 📊 Direct Google Sheets integration
- ⏱ Automatic timestamp logging
- 🔁 REST API (GET request based)
- 📡 Supports single & multiple parameters
- ⚡ Lightweight and fast

---

## 🧠 System Flow
Any Device / Application → HTTP Request → Google Apps Script → Google Sheets



---

## ☁️ Google Apps Script Code

### 📌 1. Basic Data Logger API
```javascript
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Time", "Data"]);
  }

  var message = e.parameter.message;

  sheet.appendRow([new Date(), message]);

  return ContentService.createTextOutput("Logged: " + message);
}



