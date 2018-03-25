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
    var callback = function(cell, value, docIdx, fieldIdx)
    {
      if (docIdx === 0) {
        cell.setFontWeight('bold');
      }
      cell.setValue(value);
    };

    this._insertDataToCells(callback, documentsData, true, insertType);
  }

  this.insertEditorAccessLinks = function(linksList, insertType)
  {
    var callback = function(cell, link, firstIdx, secondIdx)
    {
      cell.setFormula('=HYPERLINK("' + link.url + '", "' + link.name + '")');
      cell.setNote('document ID: ' + link.id + '\n' + 'document name: ' + link.name + '\n');
    };

    this._insertDataToCells(callback, linksList, false, insertType);
  }

  this.insertDataHeader = function(templateId, headerData, insertType)
  {
    var callback = function(templateId, cell, fieldData, firstIdx, secondIdx)
    {
      cell.setValue(fieldData.name);
      cell.setFontWeight('bold');
      cell.setNote(this._makeFieldNote(fieldData, templateId));
    };

    this._insertDataToCells(callback.bind(this, templateId), headerData, false, insertType);
  }

  this._insertDataToCells = function(callback, collection, is2d, insertType)
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
    var firstIdx = 0;
    var collection = (is2d) ? collection : [collection];

    while (firstIdx < collection.length) {
      var subCollection = collection[firstIdx];
      var secondIdx = 0;

      while (secondIdx < subCollection.length) {
        var rowNumber = (position === this.HORIZONTAL) ? firstRow + firstIdx : firstRow + secondIdx;
        var columnNumber = (position === this.HORIZONTAL) ? firstColumn + secondIdx : firstColumn + firstIdx;
        var cell = sheet.getRange(rowNumber, columnNumber);
        var value = subCollection[secondIdx];

        callback(cell, value, firstIdx, secondIdx);
        secondIdx++;
      }
      firstIdx++;
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
