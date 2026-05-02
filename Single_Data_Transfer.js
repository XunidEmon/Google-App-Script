// Single Message Send to Google Sheets API
const url = "https://script.google.com/macros/s/XXXX/exec?message=HELLO";

fetch(url)
  .then(response => response.text())
  .then(data => {
    console.log("Response:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  });



// Simple Data Send to Google Sheets API

let data = 123;

const url = `https://script.google.com/macros/s/XXXX/exec?data=${data}`;

fetch(url)
  .then(response => response.text())
  .then(result => {
    console.log("Response:", result);
  })
  .catch(error => {
    console.error("Error:", error);
  });
