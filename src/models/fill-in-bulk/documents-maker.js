import documents from './documents';
import documentFields from './document-fields';
import folders from './folders';
import { USE_EXISTING_FOLDER, CREATE_NEW_FOLDER } from './folders';
import errors from '../common/errors';
import labels from '../../labels';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

class DocumentsMaker {
  constructor() {

  }

  makeDocuments(unlockScreenCallback) {
    let bundlesPromise = this._getBundlesPromise();

    let foldersPromise = bundlesPromise.then((response) => {
      if (response === null) {
        return Promise.resolve(null);
      }

      return (folders.getFolderAction() === USE_EXISTING_FOLDER)
        ? this._getExistingFolderPromise(response)
        : this._getNewFolderPromise(response);
    });

    let documentsPromise = foldersPromise.then((response) => {
      if (response === null) {
        return Promise.resolve(null);
      }
      return Promise.all(this._getDocumentsPromises(response));
    });

    documentsPromise.then((responses) => {
      console.log(responses);
      unlockScreenCallback();
    });
  }

  isButtonDisabled() {
    return (documents.getSelectedDocumentId() === 0
      || documentFields.isLoading()) ? true : null;
  }

  _getBundlesPromise() {
    let promise = new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((response) => {
          resolve(response);
        })
        .ccReadSelectedCells();
    });

    return promise.then((response) => {
      let dataBundles = this._createDataBundles(response);

      if (dataBundles.length === 0) {
        errors.addPortion([labels.l_38]);
        errors.send();
        return Promise.resolve(null);
      }
      return Promise.resolve(dataBundles);
    });
  }

  _getExistingFolderPromise(dataBundles) {
    return Promise.resolve({
      folderId: folders.getSelectedFolderId(),
      dataBundles: dataBundles
    });
  }

  _getNewFolderPromise(dataBundles) {
    let promise = new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((response) => {
          resolve(response);
        })
        .ccCreateNewFolder(folders.getFolderName());
    });

    return promise.then((response) => {
      if (response.responseCode !== 200) {
        errors.addPortion([response]);
        errors.send();
        return Promise.resolve(null);
      }
      return Promise.resolve({
        folderId: response.responseContent.folder_id,
        dataBundles: dataBundles
      });
    });
  }

  _getDocumentsPromises(data) {
    let list = [];
    let template = documents.getSelectedDocument();

    for (var idx = 0; idx < data.dataBundles.length; idx++) {
      let currentBundle = data.dataBundles[idx];

      list.push(new Promise((resolve) => {
        google.script.run
          .withSuccessHandler((response) => {
            resolve(response);
          })
          .ccCreateNewDocument(
            template.id,
            template.name,
            data.folderId,
            currentBundle,
            idx + 1
          );
      }));
    }
    return list;
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
