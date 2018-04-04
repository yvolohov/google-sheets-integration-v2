import ObjectsExtractor from '../classes/objects-extractor';
import documents from './documents';
import documentsFields from './documents-fields';
import fieldsCache from '../common/fields-cache';

class DocumentsExtractor extends ObjectsExtractor {
  constructor() {
    super();
  }

  insertDocumentsData(unlockScreenCallback) {
    let documentsHeader = this._getHeader(documentsFields);
    let documentsData = this._getDocumentsData(documentsHeader);

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(documentsData, this.insertType);
  }

  isButtonDisabled() {
    return this._isButtonDisabled(documentsFields);
  }

  _getDocumentsData(documentsHeader) {
    let selectedDocuments = documents.getSelectedDocumentsList();
    let fields = documentsFields.getFields();
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
}

export default new DocumentsExtractor();
