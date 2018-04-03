import BaseExtractor from '../classes/base-extractor';
import documents from './documents';
import documentsFields from './documents-fields';
import fieldsCache from '../common/fields-cache';
import { DOCUMENT_ID, DOCUMENT_NAME } from '../classes/base-extractor';

class DocumentsExtractor extends BaseExtractor {
  constructor() {
    super();
  }

  insertDocumentsData(unlockScreenCallback) {
    let documentsData = this._getDocumentsData();

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(documentsData, this.insertType);
  }

  isButtonDisabled() {
    return super._isButtonDisabled(documentsFields);
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
          value = super._getValueForServiceField(name, currentDocument);
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

  _getDocumentsHeader() {
    return super._getHeader(documentsFields);
  }
}

export default new DocumentsExtractor();
