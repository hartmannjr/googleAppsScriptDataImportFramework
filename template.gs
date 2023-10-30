function importSource1Data(messages,source) //modify [Source1] accordingly
{
  var source = "template"; // change "template" to your source, has to match exactly with the label. remove line after debugging
  var sheetName = source + "Import";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  // constants
  
  if (sheet === null) {
      let errormessage = "Unable to process data from source: " + source + ". Sheet not found."
      console.error(errormessage);
      return new Error(errormessage);
  }
  
  // start removal after debugging
  var label = GmailApp.getUserLabelByName("Imports/" + source + "Imports");
  var threads = label.getThreads();

  for (let i = 0; i < threads.length; i++)
  {
    var messages = threads[i].getMessages();

  // remove line 15 to here after debugging. master.gs will handle this.

  var data = [];
  for (let i = 0; i < messages.length; i++)
  {
    var msg = messages[i].getPlainBody().toString();
    // more logic here as needed
    data.push([msg]);
  }

  if (data.length > 0) {
  var lastRow = sheet.getLastRow();
  sheet.getRange(sheet.getLastRow()+1,1,data.length, data[0].length).setValues(data);
  }
  } // <- remove after debugging
}
