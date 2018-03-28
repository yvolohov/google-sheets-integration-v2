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
    var selectedFields = this._getSelectedFieldsSet();
    var headerType = this._recognizeRangeHeader(selectedFields, cells);

    return cells;
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
