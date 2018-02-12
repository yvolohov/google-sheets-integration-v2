import MultipageRequest from '../lib/multipage-request';
import errors from './errors';

class FillRequestForms {
  constructor() {
    this.filledForms = {};
    this.filledFormsAsList = {};
    this.selectedFillRequestId = 0;
  }

  getSelectedFillRequestForms() {
    return (this.selectedFillRequestId in this.filledFormsAsList)
      ? this.filledFormsAsList[this.selectedFillRequestId] : [];
  }

  selectForm(filledFormId, checkboxChecked) {
    if (!(this.selectedFillRequestId in this.filledForms)) {
      return;
    }

    let currentFillRequestForms = this.filledForms[this.selectedFillRequestId];

    if (filledFormId in currentFillRequestForms) {
      let currentForm = currentFillRequestForms[filledFormId];
      currentForm.checkboxChecked = checkboxChecked;
    }
  }

  setForms(fillRequestId, callback=null) {
    this.selectedFillRequestId = fillRequestId;

    if (this.selectedFillRequestId == 0 || (this.selectedFillRequestId in this.filledForms)) {
      if (callback !== null) {
        callback();
      }
    }
    else {
      this._loadForms(fillRequestId, callback);
    }
  }

  _loadForms(fillRequestId, callback) {
    let multipageRequest = new MultipageRequest('ccGetFilledForms');
    multipageRequest.setPerPage(100);
    multipageRequest.setAdditionalParameters({
      fillableFormId: this.selectedFillRequestId
    });

    return multipageRequest.get(
      this._pageCallback.bind(this),
      this._postCallback.bind(this, callback)
    );
  }

  _pageCallback(response, pagesResults, pagesErrors) {
    if (response.responseCode !== 200) {
      pagesErrors.push(response);
      return;
    }

    let filledForms = response.responseContent.items;

    for (let filledFormIdx in filledForms) {
      let currentFilledForm = filledForms[filledFormIdx];
      pagesResults.push(currentFilledForm);
    }
  }

  _postCallback(redrawCallback, pagesResults, pagesErrors) {
    errors.addPortion(pagesErrors);
    errors.send();

    let filledForms = {};

    for (let filledFormIdx in pagesResults) {
      let currentFilledForm = pagesResults[filledFormIdx];
      currentFilledForm['checkboxChecked'] = true;
      filledForms[currentFilledForm.filled_form_id] = currentFilledForm;
    }
    pagesResults.sort(this._sortFilledFormsCallback.bind(this));
    this.filledForms[this.selectedFillRequestId] = filledForms;
    this.filledFormsAsList[this.selectedFillRequestId] = pagesResults;

    if (redrawCallback !== null) {
      redrawCallback();
    }
  }

  _sortFilledFormsCallback(a, b) {
    return (a.filled_form_id > b.filled_form_id) ? 1 : -1;
  }
}

export default new FillRequestForms();
