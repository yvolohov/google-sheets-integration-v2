import fieldsCache from '../common/fields-cache';
import { srvSelectListItem, srvMoveListItem } from '../../lib/service-functions';

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
    let callback = (item) => {
      return (item.name === fieldName);
    };
    srvSelectListItem(this.fieldsList, callback, flag);
  }

  moveField(idx, up) {
    srvMoveListItem(this.fieldsList, idx, up);
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
