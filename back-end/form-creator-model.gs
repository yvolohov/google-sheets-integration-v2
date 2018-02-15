function FormCreatorModel()
{
  this.readSelectedCells = function()
  {
    var sheet = SpreadsheetApp.getActiveSheet();
    var range = sheet.getActiveRange();
    return range.getDisplayValues();
  }
}

var formCreatorModel = new FormCreatorModel();
