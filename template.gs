function importSource1Data(_messages,_source) //modify [Source1] accordingly
{
  var _source = "template"; // change "template" to your source, has to match exactly with the label. remove line after debugging
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(_source+"Import");
  
  if (sheet === null) {
      let errormessage = "Unable to process data from source: "+_source+". Sheet not found."
      console.error(errormessage);
      return new Error(errormessage);
  }
  
  // start removal after debugging
  var label = GmailApp.getUserLabelByName("Imports/"+_source+"Imports");
  var threads = label.getThreads();

  for (var i = 0; i < threads.length; i++)
  {
    var messages = threads[i].getMessages();

  // remove line 12 to here after debugging. master.gs will handle this.

  for(var j = 0; j < _messages.length; j++)
  {
    var msg = _messages[j].getPlainBody().toString();
    // more logic here as needed
    var data = [[msg]];

    sheet.getRange(sheet.getLastRow()+1,1,data.length, data[0].length).setValues(data);
  }
  } // <- remove after debugging
}
