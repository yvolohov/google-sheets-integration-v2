import documents from './documents';
import documentsFields from './documents-fields';
import fieldsLoader from '../common/fields-loader';
import errors from '../common/errors';

class DocsExtractor {
  constructor() {
    this.insertType = 0;
  }

  getInsertType() {
    return this.insertType;
  }

  setInsertType(insertType) {
    this.insertType = parseInt(insertType);
  }

  insertDocumentsData(unlockScreenCallback) {
    let documentsData = this._getDocumentsData();

    if (!(documentsData.length > 1)) {
      unlockScreenCallback();
      return;
    }

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(documentsData, this.insertType);
  }

  _getDocumentsData() {
    let selectedDocuments = documents.getSelectedDocumentsList();
    let selectedFields = this._getSelectedFields();
    let documentsData = [selectedFields];

    for (let docIdx in selectedDocuments) {
      let currentDocument = selectedDocuments[docIdx];
      let currentDocumentFields = fieldsLoader.getFieldsAsSet(currentDocument.id);
      let documentData = [currentDocument.id, currentDocument.name];

      for (var fldIdx = 2; fldIdx < selectedFields.length; fldIdx++) {
        let name = selectedFields[fldIdx];
        let value = (name in currentDocumentFields) ? currentDocumentFields[name].value : '';
        documentData.push(value);
      }
      documentsData.push(documentData);
    }
    return documentsData;
  }

  _getSelectedFields() {
    let fields = documentsFields.getFields();
    let selectedFields = ['__ID', '__NAME'];

    for (let idx in fields) {
      let currentField = fields[idx];

      if (currentField.flag) {
        selectedFields.push(currentField.name);
      }
    }
    return selectedFields;
  }
}

export default new DocsExtractor();
