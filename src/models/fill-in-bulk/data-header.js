import documentFields from './document-fields';

class DataHeader {
  constructor() {
    this.insertType = 0;
  }

  getInsertType() {
    return this.insertType;
  }

  setInsertType(insertType) {
    this.insertType = parseInt(insertType);
  }

  createDataHeader() {
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
    google.script.run.ccCreateDataHeader(documentId, selectedFields, this.insertType);
  }
}

export default new DataHeader();
