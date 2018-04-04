import ObjectsFields from '../classes/objects-fields';
import fieldsCache from '../common/fields-cache';
import { DOCUMENT_ID, DOCUMENT_NAME } from '../classes/objects-extractor';

class DocumentsFields extends ObjectsFields {
  constructor() {
    super();
  }

  refreshFields(documentId, flag, onSuccess, onError) {
    this.loading = true;

    if (!flag) {
      this._removeFieldsFromList(documentId);
      this.loading = false;
      onSuccess();
      return;
    }

    let localOnSuccess = (list, set) => {
      this._addFieldsToList(documentId, list, set);
      this.loading = false;
      onSuccess();
    };

    let localOnError = (response) => {
      this.loading = false;
      onError();
    };

    fieldsCache.loadFields(documentId, localOnSuccess, localOnError);
  }

  _addFieldsToList(documentId, list, set) {
    this._addFieldToList(DOCUMENT_ID, true);
    this._addFieldToList(DOCUMENT_NAME, true);

    for (let currentFieldIdx in list) {
      this._addFieldToList(list[currentFieldIdx].name, false);
    }
  }

  _removeFieldsFromList(documentId) {
    let list = fieldsCache.getFieldsAsList(documentId);
    this._removeFieldFromList(DOCUMENT_ID, true);
    this._removeFieldFromList(DOCUMENT_NAME, true);

    for (let currentFieldIdx in list) {
      this._removeFieldFromList(list[currentFieldIdx].name, false);
    }
  }
}

export default new DocumentsFields();
