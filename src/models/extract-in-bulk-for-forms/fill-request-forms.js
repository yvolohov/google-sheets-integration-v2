import formsCache from '../common/forms-cache';
import { srvSelectListItem } from '../../lib/service-functions';

class FillRequestForms {
  constructor() {
    this.loading = false;
    this.formsList = [];
  }

  isLoading() {
    return this.loading;
  }

  getForms() {
    return this.formsList;
  }

  selectForm(filledFormId, flag) {
    let callback = (item) => {
      return (item.filledFormId === filledFormId);
    };
    srvSelectListItem(this.formsList, callback, flag);
  }

  refreshForms(fillRequestId, onSuccess, onError) {
    this.formsList = [];

    if (parseInt(fillRequestId) === 0) {
      onSuccess();
      return;
    }

    this.loading = true;

    let localOnSuccess = (list, set) => {
      this._addFormsToList(fillRequestId, list, set);
      this.loading = false;
      onSuccess();
    };

    let localOnError = (response) => {
      this.loading = false;
      onError();
    };

    formsCache.loadForms(fillRequestId, localOnSuccess, localOnError);
  }

  _addFormsToList(fillRequestId, list, set) {
    for (let idx in list) {
      let currentForm = list[idx];

      this.formsList.push({
        filledFormId: currentForm.filled_form_id,
        name: currentForm.name,
        email: currentForm.email,
        flag: false
      });
    }
    this.formsList.sort(this._sortFormsCallback);
  }

  _sortFormsCallback(a, b) {
    return (parseInt(a.filledFormId) > parseInt(b.filledFormId)) ? 1 : -1;
  }
}

export default new FillRequestForms();
