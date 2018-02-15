// -= ENTRY POINT =-

function onInstall(e)
{
  onOpen(e);
}

function onOpen(e)
{
  /* in Auth mode NONE onOpen can't get data from the store to start workflow */
  if (e && e.authMode == ScriptApp.AuthMode.NONE) {

    /* we can only start workflow from the menu point */
    var menu = SpreadsheetApp.getUi().createAddonMenu();
    menu.addItem('Start Workflow', 'ccCreateAddonMenu');
    menu.addToUi();
  }
  else {
    ccCreateAddonMenu();
  }
}
