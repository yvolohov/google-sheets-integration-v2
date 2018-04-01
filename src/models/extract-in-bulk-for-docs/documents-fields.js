import fieldsCache from '../common/fields-cache';
import { srvMoveField } from '../../lib/service-functions';

export const DOCUMENT_ID = '_ID_';
export const DOCUMENT_NAME = '_NAME_';

class DocumentsFields {
  constructor() {
    this.loading = false;
    this.fieldsList = [];
  }

  isLoading() {
    return this.loading;
  }

  getFields() {
    return this.fieldsList;
  }

  selectField(fieldName, isService, flag) {
    let fieldIdx = this.fieldsList.findIndex((item) => {
      return (item.name === fieldName && item.service === isService);
    });

    if (fieldIdx > -1) {
      this.fieldsList[fieldIdx].flag = flag;
    }
  }

  moveField(idx, up) {
    srvMoveField(this.fieldsList, idx, up);
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

  _addFieldToList(fieldName, isService) {
    let fieldIdx = this.fieldsList.findIndex((item) => {
      return (item.name === fieldName && item.service === isService);
    });

    if (fieldIdx > -1) {
      this.fieldsList[fieldIdx].count++;
      return;
    }

    this.fieldsList.push({
      name: fieldName,
      flag: !isService,
      count: 1,
      service: isService
    });
  }

  _removeFieldsFromList(documentId) {
    let list = fieldsCache.getFieldsAsList(documentId);
    this._removeFieldFromList(DOCUMENT_ID, true);
    this._removeFieldFromList(DOCUMENT_NAME, true);

    for (let currentFieldIdx in list) {
      this._removeFieldFromList(list[currentFieldIdx].name, false);
    }
  }

  _removeFieldFromList(fieldName, isService) {
    let fieldIdx = this.fieldsList.findIndex((item) => {
      return (item.name === fieldName && item.service === isService);
    });

    if (fieldIdx === -1) {
      return;
    }

    let foundField = this.fieldsList[fieldIdx];

    if (foundField.count > 1) {
      foundField.count--;
      return;
    }
    this.fieldsList.splice(fieldIdx, 1);
  }
}

export default new DocumentsFields();
