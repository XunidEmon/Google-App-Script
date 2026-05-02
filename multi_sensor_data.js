// Multi Sensor Data Send to Google Sheets API

let s1 = 10;
let s2 = 20;
let s3 = 30;
let s4 = 40;
let s5 = 50;

const url =
  "https://script.google.com/macros/s/XXXX/exec" +
  `?s1=${s1}&s2=${s2}&s3=${s3}&s4=${s4}&s5=${s5}`;

fetch(url)
  .then(response => response.text())
  .then(result => {
    console.log("Response:", result);
  })
  .catch(error => {
    console.error("Error:", error);
  });
