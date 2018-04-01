import formsCache from '../common/forms-cache';
import { srvMoveField } from '../../lib/service-functions';

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
    let formIdx = this.formsList.findIndex((item) => {
      return (item.filledFormId === filledFormId);
    });

    if (formIdx > -1) {
      this.formsList[formIdx].flag = flag;
    }
  }

  moveForm(idx, up) {
    srvMoveField(this.formsList, idx, up);
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
        flag: true
      });
    }
  }
}

export default new FillRequestForms();
