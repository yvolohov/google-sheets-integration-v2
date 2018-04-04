import ObjectsFields from '../classes/objects-fields';
import formsFieldsCache from '../common/forms-fields-cache';
import { srvSelectListItem, srvMoveListItem } from '../../lib/service-functions';
import { LINK_TO_FILL_ID, FILLED_FORM_ID, USER_NAME, USER_EMAIL } from '../classes/objects-extractor';

class FormsFields extends ObjectsFields {
  constructor() {
    super();
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
    let callback = (item) => {
      return (item.name === fieldName && item.service === isService);
    };
    srvSelectListItem(this.fieldsList, callback, flag);
  }

  moveField(idx, up) {
    srvMoveListItem(this.fieldsList, idx, up);
  }

  cleanFields() {
    this.fieldsList = [];
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
    this._addFieldToList(LINK_TO_FILL_ID, true);
    this._addFieldToList(FILLED_FORM_ID, true);
    this._addFieldToList(USER_NAME, true);
    this._addFieldToList(USER_EMAIL, true);

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

  _removeFieldsFromList(fillRequestId, filledFormId) {
    let list = formsFieldsCache.getFormFieldsAsList(fillRequestId, filledFormId);
    this._removeFieldFromList(LINK_TO_FILL_ID, true);
    this._removeFieldFromList(FILLED_FORM_ID, true);
    this._removeFieldFromList(USER_NAME, true);
    this._removeFieldFromList(USER_EMAIL, true);

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

export default new FormsFields();
