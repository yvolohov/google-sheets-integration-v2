import documentFields from './document-fields';
import errors from './errors';

class DataHeader {
  constructor() {
    this.createNewSheet = false;
  }

  getNewSheetFlag() {
    return this.createNewSheet;
  }

  setNewSheetFlag(flag) {
    this.createNewSheet = flag;
  }

  createDataHeader(headerType) {
    let documentId = documentFields.getDocumentId();
    let selectedDocumentFields = documentFields.getDocumentFields();
    let selectedFields = [];

    for (let fieldIndex in selectedDocumentFields) {
      let currentField = selectedDocumentFields[fieldIndex];

      if (currentField.checkboxChecked) {
        selectedFields.push(currentField);
      }
    }

    if (selectedFields.length === 0) {
      return;
    }
    google.script.run.ccCreateDataHeader(documentId, selectedFields, headerType);
  }
}

export default new DataHeader();
