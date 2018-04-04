import ObjectsFields from '../classes/objects-fields';
import formsFieldsCache from '../common/forms-fields-cache';
import { LINK_TO_FILL_ID, FILLED_FORM_ID, USER_NAME, USER_EMAIL } from '../classes/objects-extractor';

class FormsFields extends ObjectsFields {
  constructor() {
    super();
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
}

export default new FormsFields();
