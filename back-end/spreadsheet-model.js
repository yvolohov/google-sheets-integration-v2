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
    if (this._requireNewSheet(insertType)) {
      var newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
      SpreadsheetApp.setActiveSheet(newSheet);
    }

    var sheet = SpreadsheetApp.getActiveSheet();
    var selectedCell = sheet.getActiveCell();
    var firstRow = selectedCell.getLastRow();
    var firstColumn = selectedCell.getLastColumn();

    var position = this._getHeaderPosition(insertType);
    var docIdx = 0;

    while (docIdx < documentsData.length) {
      var documentFields = documentsData[docIdx];
      var fieldIdx = 0;

      while (fieldIdx < documentFields.length) {
        var rowNumber = (position === this.HORIZONTAL) ? firstRow + docIdx : firstRow + fieldIdx;
        var columnNumber = (position === this.HORIZONTAL) ? firstColumn + fieldIdx : firstColumn + docIdx;
        var cell = sheet.getRange(rowNumber, columnNumber);
        var value = documentsData[docIdx][fieldIdx];

        if (docIdx === 0) {
          cell.setFontWeight('bold');
        }
        cell.setValue(value);
        fieldIdx++;
      }
      docIdx++;
    }
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

  this.insertDataHeader = function(templateId, headerData, insertType)
  {
    if (this._requireNewSheet(insertType)) {
      var newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
      SpreadsheetApp.setActiveSheet(newSheet);
    }

    var sheet = SpreadsheetApp.getActiveSheet();
    var selectedCell = sheet.getActiveCell();
    var firstRow = selectedCell.getLastRow();
    var firstColumn = selectedCell.getLastColumn();
    var lastRow = (this._getHeaderPosition(insertType) === this.VERTICAL) ? firstRow + headerData.length - 1 : firstRow;
    var lastColumn = (this._getHeaderPosition(insertType) === this.HORIZONTAL) ? firstColumn + headerData.length - 1 : firstColumn;
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

  this._requireNewSheet = function(insertType)
  {
    return (insertType === this.INSERT_IN_ROW_ON_NEW_SHEET || insertType === this.INSERT_IN_COLUMN_ON_NEW_SHEET);
  }

  this._getHeaderPosition = function(insertType)
  {
    return (insertType === this.INSERT_IN_ROW_ON_CURRENT_SHEET || insertType === this.INSERT_IN_ROW_ON_NEW_SHEET)
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
