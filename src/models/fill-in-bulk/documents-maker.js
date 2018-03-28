import documents from './documents';
import documentFields from './document-fields';
import errors from '../common/errors';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

class DocumentsMaker {
  constructor() {

  }

  makeDocuments(unlockScreenCallback) {
    let promise = new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((response) => {
          resolve(response);
        })
        .ccReadSelectedCells();
    });

    promise.then((response) => {
      let dataBundles = this._createDataBundles(response);

      //
      console.log(dataBundles);

      unlockScreenCallback();
    });
  }

  isButtonDisabled() {
    return (documents.getSelectedDocumentId() === 0) ? true : null;
  }

  _createDataBundles(cells) {
    let selectedFields = this._getSelectedFieldsSet();
    let headerType = this._recognizeRangeHeader(selectedFields, cells);
    let dataBundles = [];

    if (headerType === HORIZONTAL) {
      dataBundles = this._readFromHorizontalTable(cells, selectedFields);
    }
    else if (headerType === VERTICAL) {
      dataBundles = this._readFromVerticalTable(cells, selectedFields);
    }
    return dataBundles;
  }

  _readFromHorizontalTable(cells, selectedFields) {
    let list = [];
    let rowsCount = cells.length;
    let columnsCount = cells[0].length;

    for (var rowIndex = 1; rowIndex < rowsCount; rowIndex++) {
      let bundle = {};

      for (var columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
        let header = cells[0][columnIndex];
        let value = cells[rowIndex][columnIndex];

        if (header in selectedFields) {
          bundle[header] = value;
        }
      }

      if (Object.keys(bundle).length > 0) {
        list.push(bundle);
      }
    }
    return list;
  }

  _readFromVerticalTable(cells, selectedFields) {
    let list = [];
    let columnsCount = cells[0].length;
    let rowsCount = cells.length;

    for (var columnIndex = 1; columnIndex < columnsCount; columnIndex++) {
      let bundle = {};

      for (var rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
        let header = cells[rowIndex][0];
        let value = cells[rowIndex][columnIndex];

        if (header in selectedFields) {
          bundle[header] = value;
        }
      }

      if (Object.keys(bundle).length > 0) {
        list.push(bundle);
      }
    }
    return list;
  }

  _recognizeRangeHeader(selectedFields, cells) {
    let headerType = null;
    let firstRow = cells[0];
    let firstColumn = cells.map((row) => {return row[0];});
    let matchesInRow = 0;
    let matchesInColumn = 0;

    firstRow.forEach((item) => {
      matchesInRow = (item in selectedFields) ? matchesInRow + 1 : matchesInRow;
    });

    firstColumn.forEach((item) => {
      matchesInColumn = (item in selectedFields) ? matchesInColumn + 1 : matchesInColumn;
    });

    let rowPercent = matchesInRow / firstRow.length;
    let columnPercent = matchesInColumn / firstColumn.length;

    if (columnPercent > rowPercent) {
      headerType = VERTICAL;
    }
    else if (rowPercent > columnPercent) {
      headerType = HORIZONTAL;
    }
    else {
      headerType = (firstRow.length > firstColumn.length) ? HORIZONTAL : VERTICAL;
    }
    return headerType;
  }

  _getSelectedFieldsSet() {
    let selectedFields = {};
    let fields = documentFields.getFields();

    fields.forEach((item) => {
      if (item.flag) {
        selectedFields[item.name] = item.name;
      }
    });
    return selectedFields;
  }
}

export default new DocumentsMaker();
