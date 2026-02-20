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









