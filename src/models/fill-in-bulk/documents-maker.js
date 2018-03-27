import documents from './documents';
import errors from '../common/errors';

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
      this._recognizeRangeHeader(response);
      unlockScreenCallback();
    });
  }

  isButtonDisabled() {
    return (documents.getSelectedDocumentId() === 0) ? true : null;
  }

  _recognizeRangeHeader(cells) {
    let firstRow = cells[0];
    let firstColumn = cells.map((row) => {return row[0];});

    firstRow.forEach((item) => {
      console.log(item);
    });

    firstColumn.forEach((item) => {
      console.log(item);
    });
  }
}

export default new DocumentsMaker();
