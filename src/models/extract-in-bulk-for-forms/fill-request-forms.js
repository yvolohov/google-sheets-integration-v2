import formsCache from '../common/forms-cache';
import { srvSelectListItem } from '../../lib/service-functions';

class FillRequestForms {
  constructor() {
    this.loading = false;
    this.formsList = [];
    this.selectedFormsList = [];
  }

  isLoading() {
    return this.loading;
  }

  getForms() {
    return this.formsList;
  }

  getSelectedForms() {
    return this.selectedFormsList;
  }

  selectForm(filledFormId, flag) {
    let callback = (item) => {
      return (item.filledFormId === filledFormId);
    };

    let selectedForm = srvSelectListItem(this.formsList, callback, flag);

    if (selectedForm) {
      this._refreshSelectedFormsList(selectedForm, flag);
    }
  }

  refreshForms(fillRequestId, onSuccess, onError) {
    this.formsList = [];
    this.selectedFormsList = [];

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

  _refreshSelectedFormsList(selectedForm, flag) {
    if (flag) {
      this.selectedFormsList.push(selectedForm);
      return;
    }

    let idx = this.selectedFormsList.findIndex((item) => {
      return (item.filledFormId === selectedForm.filledFormId);
    });

    if (idx > -1) {
      this.selectedFormsList.splice(idx, 1);
    }
  }

  _sortFormsCallback(a, b) {
    return (parseInt(a.filledFormId) > parseInt(b.filledFormId)) ? 1 : -1;
  }
}

export default new FillRequestForms();
