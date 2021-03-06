import documents from './documents';
import documentFields from './document-fields';
import fieldsCache from '../common/fields-cache';

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

  isButtonDisabled() {
    return (documents.getSelectedDocumentId() === 0
      || documentFields.isLoading()) ? true : null;
  }

  createDataHeader() {
    let documentId = documents.getSelectedDocumentId();
    let compactFields = documentFields.getFields();
    let fields = fieldsCache.getFieldsAsSet(documentId);
    let selectedFields = [];

    for (let idx in compactFields) {
      let compactField = compactFields[idx];

      if (compactField.flag) {
        selectedFields.push(fields[compactField.name]);
      }
    }

    if (selectedFields.length === 0) {
      return;
    }

    google.script.run
      .ccInsertDataHeader(documentId, selectedFields, this.insertType);
  }
}

export default new DataHeader();
