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
    let selectedFields = this._getSelectedFields();
    let documentsData = this._getDocumentsData(selectedFields);

    if (documentsData.length === 0) {
      unlockScreenCallback();
      return;
    }

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(documentsData, this.insertType);
  }

  _getDocumentsData(selectedFields) {
    let selectedDocuments = documents.getSelectedDocumentsList();
    let documentsData = [];

    for (let docIdx in selectedDocuments) {
      let currentDocument = selectedDocuments[docIdx];
      let currentDocumentFields = fieldsLoader.getFieldsAsSet(currentDocument.id);
      let documentData = {
        id: currentDocument.id,
        name: currentDocument.name,
        fields: []
      };

      for (let fldIdx in selectedFields) {
        let name = selectedFields[fldIdx];
        let value = (name in currentDocumentFields) ? currentDocumentFields[name].value : '';
        documentData.fields.push({name: name, value: value});
      }
      documentsData.push(documentData);
    }
    return documentsData;
  }

  _getSelectedFields() {
    let fields = documentsFields.getFields();
    let selectedFields = [];

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
