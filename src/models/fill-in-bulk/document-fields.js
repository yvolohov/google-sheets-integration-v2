import fieldsLoader from '../common/fields-loader';

class DocumentFields {
  constructor() {
    this.selectedDocumentId = 0;
  }

  getDocumentId() {
    return this.selectedDocumentId;
  }

  getDocumentFields() {
    return fieldsLoader.getFields(this.selectedDocumentId);
  }

  selectDocumentField(fieldName, flag) {
    fieldsLoader.markField(this.selectedDocumentId, fieldName, flag);
  }

  loadDocumentFields(documentId, callback) {
    this.selectedDocumentId = documentId;

    if (documentId != 0) {
      fieldsLoader.loadFields(documentId, callback);
    }
  }
}

export default new DocumentFields();
