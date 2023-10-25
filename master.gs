function run() {
  var errorlog = [];

  var sources = ["Source1","Source2"]; // Step 1: add Source here by name. this will be used in finding your labels, and feeding to the appropriate sheet, so your names must match exactly.
  var importLabels = {};
  var importedLabel = GmailApp.getUserLabelByName("Imports/Imported");
  
  if (importedLabel === null){
    let errormessage = console.error("Imports/Imported label not found.");
    errorlog.push(errormessage);
    return;
  }

  for (var i = 0; i < sources.length; i++) {
    importLabels[sources[i]] = GmailApp.getUserLabelByName("Imports/" + sources[i] + "Imports");
  }
  
  for (var i = 0; i < sources.length; i++)
  {
    var result = myGetMessages(sources[i], importLabels[sources[i]], importedLabel);

    if (result instanceof Error) {
      errorlog.push(result.message);
    }
  }
  
  if (errorlog.length > 0) {
    sendErrorEmail(errorlog);
  }
}

function myGetMessages(source, label, importedLabel) {
  if (label === null) {
    let errormessage = "Unable to process emails from source: " + source + ". Label not found."
    console.error(errormessage);
    return new Error(errormessage);
  }
  var threads = label.getThreads();
  var handler = getDataHandler(source);

  if (!handler) {
    let errormessage = "Unable to process data from source: " + source + ". Data handler not defined.";
    console.error(errormessage);
    return new Error(errormessage);
  }
  
  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    var handlerResult = handler(messages, source);
    
    if (handlerResult instanceof Error) {
      return new Error(handlerResult);
    } else {
      thread.removeLabel(label);
      thread.addLabel(importedLabel);
    }
  });
}

function getDataHandler(source) {
  var handlers = {
    "Source1"    : importSource1Data,
    "Source2"    : importSource2Data,
    // Step 2: define data handler name
    // Step 3: create new class and method for data handler (see template.gs)
  };
  return handlers[source];
}

function sendErrorEmail(errorlog) {
  var recipient = Session.getEffectiveUser().getEmail();
  var subject = "Error results from House Data Import Job"
  var body = "The follow error(s) occured while running the House Data Import Job:\n\n"; 
  for (var i = 0; i < errorlog.length; i++)
  {
    body += errorlog[i] + "\n";
  }

  MailApp.sendEmail(recipient, subject, body);
}
