import documents from './documents';
import documentsFields from './documents-fields';
import fieldsCache from '../common/fields-cache';
import { DOCUMENT_ID, DOCUMENT_NAME } from './documents-fields';

class DocumentsExtractor {
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

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(documentsData, this.insertType);
  }

  isButtonDisabled() {
    let loading = documentsFields.isLoading();
    let fields = documentsFields.getFields();
    let noSelectedFields = (fields.findIndex((item) => {return item.flag;}) === -1);
    return (loading || noSelectedFields) ? true : null;
  }

  _getDocumentsData() {
    let selectedDocuments = documents.getSelectedDocumentsList();
    let fields = documentsFields.getFields();
    let documentsHeader = this._getDocumentsHeader();
    let documentsData = [documentsHeader];

    for (let docIdx in selectedDocuments) {
      let currentDocument = selectedDocuments[docIdx];
      let currentDocumentFields = fieldsCache.getFieldsAsSet(currentDocument.id);
      let documentData = [];

      for (let fldIdx in fields) {
        let currentField = fields[fldIdx];
        let name = currentField.name;
        let value = '';

        if (!currentField.flag) {
          continue;
        }

        if (currentField.service) {
          value = this._getValueForServiceField(name, currentDocument);
        }
        else {
          value = (name in currentDocumentFields) ? currentDocumentFields[name].value : '';
        }
        documentData.push(value);
      }
      documentsData.push(documentData);
    }
    return documentsData;
  }

  _getValueForServiceField(fieldName, currentDocument) {
    let value = '';

    if (fieldName === DOCUMENT_ID) {
      value = currentDocument.id;
    }
    else if (fieldName === DOCUMENT_NAME) {
      value = currentDocument.name;
    }
    return value;
  }

  _getDocumentsHeader() {
    let fields = documentsFields.getFields();
    let header = [];

    for (let idx in fields) {
      let currentField = fields[idx];

      if (currentField.flag) {
        header.push(currentField.name);
      }
    }
    return header;
  }
}

export default new DocumentsExtractor();
