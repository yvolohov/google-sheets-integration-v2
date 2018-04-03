import formsFieldsCache from '../common/forms-fields-cache';
import { srvSelectListItem, srvMoveListItem } from '../../lib/service-functions';

class FormsFields {
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

  refreshFields(fillRequestId, filledFormId, flag, onSuccess, onError) {
    this.loading = true;

    if (!flag) {
      this._removeFieldsFromList(fillRequestId, filledFormId);
      this.loading = false;
      onSuccess();
      return;
    }

    let localOnSuccess = (list, set) => {
      this._addFieldsToList(fillRequestId, filledFormId, list, set);
      this.loading = false;
      onSuccess();
    };

    let localOnError = (response) => {
      this.loading = false;
      onError();
    };

    formsFieldsCache.loadFormFields(fillRequestId, filledFormId, localOnSuccess, localOnError);
  }

  _addFieldsToList(fillRequestId, filledFormId, list, set) {

  }

  _removeFieldsFromList(fillRequestId, filledFormId) {

  }
}

export default new FormsFields();
