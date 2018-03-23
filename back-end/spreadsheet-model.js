function SpreadsheetModel()
{
  this.INSERT_IN_ROW_ON_CURRENT_SHEET = 0;
  this.INSERT_IN_COLUMN_ON_CURRENT_SHEET = 1;
  this.INSERT_IN_ROW_ON_NEW_SHEET = 2;
  this.INSERT_IN_COLUMN_ON_NEW_SHEET = 3;
  this.HORIZONTAL = 'horizontal';
  this.VERTICAL = 'vertical';

  this.readSelectedCells = function()
  {
    var sheet = SpreadsheetApp.getActiveSheet();
    var range = sheet.getActiveRange();
    return range.getDisplayValues();
  }

  this.insertDocumentsData = function(documentsData, insertType)
  {
    Logger.log(JSON.stringify(documentsData));
    Logger.log(insertType);
  }

  this.insertEditorAccessLinks = function(linksList, insertType)
  {
    var sheet = SpreadsheetApp.getActiveSheet();
    var selectedCell = sheet.getActiveCell();
    var firstRow = selectedCell.getLastRow();
    var firstColumn = selectedCell.getLastColumn();
    var lastRow = (insertType === this.INSERT_IN_COLUMN_ON_CURRENT_SHEET) ? firstRow + linksList.length - 1 : firstRow;
    var lastColumn = (insertType === this.INSERT_IN_ROW_ON_CURRENT_SHEET) ? firstColumn + linksList.length - 1 : firstColumn;
    var linkIndex = 0;

    for (var rowNumber = firstRow; rowNumber <= lastRow; rowNumber++) {
      for (var columnNumber = firstColumn; columnNumber <= lastColumn; columnNumber++) {
        var cell = sheet.getRange(rowNumber, columnNumber);
        var link = linksList[linkIndex];
        cell.setFormula('=HYPERLINK("' + link.url + '", "' + link.name + '")');
        linkIndex++;
      }
    }
  }

  this.insertDataHeader = function(templateId, headerData, headerType)
  {
    if (this._requireNewSheet(headerType)) {
      var newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
      SpreadsheetApp.setActiveSheet(newSheet);
    }

    var sheet = SpreadsheetApp.getActiveSheet();
    var selectedCell = sheet.getActiveCell();
    var firstRow = selectedCell.getLastRow();
    var firstColumn = selectedCell.getLastColumn();
    var lastRow = (this._getHeaderPosition(headerType) === this.VERTICAL) ? firstRow + headerData.length - 1 : firstRow;
    var lastColumn = (this._getHeaderPosition(headerType) === this.HORIZONTAL) ? firstColumn + headerData.length - 1 : firstColumn;
    var fieldIndex = 0;

    for (var rowNumber = firstRow; rowNumber <= lastRow; rowNumber++) {
      for (var columnNumber = firstColumn; columnNumber <= lastColumn; columnNumber++) {
        var cell = sheet.getRange(rowNumber, columnNumber);
        var fieldName = headerData[fieldIndex].name;
        cell.setValue(fieldName);
        cell.setFontWeight('bold');
        cell.setNote(this._makeFieldNote(headerData[fieldIndex], templateId));
        fieldIndex++;
      }
    }
  }

  this._requireNewSheet = function(headerType)
  {
    return (headerType === this.INSERT_IN_ROW_ON_NEW_SHEET || headerType === this.INSERT_IN_COLUMN_ON_NEW_SHEET);
  }

  this._getHeaderPosition = function(headerType)
  {
    return (headerType === this.INSERT_IN_ROW_ON_CURRENT_SHEET || headerType === this.INSERT_IN_ROW_ON_NEW_SHEET)
      ? this.HORIZONTAL : this.VERTICAL;
  }

  this._makeFieldNote = function(field, templateId)
  {
    var description = 'template ID: ' + templateId + '\n' + 'type: ' + field.type + '\n';

    switch (field.type) {
      case 'date':
        description = description + 'format: ' + field.format + '\n';
        break;

      case 'checkmark':
        description = description + 'possible values: ON,OFF\n';
        break;

      case 'dropdown':
        var list = (field.list) ? field.list.toString() : '<not defined>';
        description = description + 'possible values: ' + list + '\n';
        break;
    }

    return description;
  }
}

var spreadsheetModel = new SpreadsheetModel();
