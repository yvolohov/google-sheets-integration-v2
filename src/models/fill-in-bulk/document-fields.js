import fieldsCache from '../common/fields-cache';
import { srvMoveField } from '../../lib/service-functions';

class DocumentFields {
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

  selectField(fieldName, flag) {
    let fieldIdx = this.fieldsList.findIndex((item) => {
      return (item.name === fieldName);
    });

    if (fieldIdx > -1) {
      this.fieldsList[fieldIdx].flag = flag;
    }
  }

  moveField(idx, up) {
    srvMoveField(this.fieldsList, idx, up);
  }

  refreshFields(documentId, onSuccess, onError) {
    this.fieldsList = [];

    if (parseInt(documentId) === 0) {
      onSuccess();
      return;
    }

    this.loading = true;

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
    for (let currentFieldIdx in list) {
      let currentField = list[currentFieldIdx];

      this.fieldsList.push({
        name: currentField.name,
        type: currentField.type,
        flag: true
      });
    }
  }
}

export default new DocumentFields();
