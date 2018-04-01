import MultipageRequest from '../../lib/multipage-request';
import errors from './errors';

class FormsCache {
  constructor() {
    this.sets = {};
    this.lists = {};
  }

  loadForms(fillRequestId, onSuccess, onError=null) {
    if (fillRequestId in this.lists) {
      onSuccess(this.lists[fillRequestId], this.sets[fillRequestId]);
      return;
    }

    let multipageRequest = new MultipageRequest('ccGetFilledForms');
    multipageRequest.setPerPage(100);
    multipageRequest.setAdditionalParameters({
      fillableFormId: fillRequestId
    });

    multipageRequest.get(
      this._pageCallback.bind(this),
      this._postCallback.bind(this, fillRequestId, onSuccess, onError)
    );
  }

  getFormsAsList(fillRequestId) {
    return (fillRequestId in this.lists) ? this.lists[fillRequestId] : [];
  }

  getFormsAsSet(fillRequestId) {
    return (fillRequestId in this.sets) ? this.sets[fillRequestId] : {};
  }

  _pageCallback(response, pagesResults, pagesErrors) {
    if (response.responseCode !== 200) {
      pagesErrors.push(response);
      return;
    }

    let filledForms = response.responseContent.items;

    for (let idx in filledForms) {
      let currentFilledForm = filledForms[idx];
      pagesResults.push(currentFilledForm);
    }
  }

  _postCallback(fillRequestId, onSuccess, onError, pagesResults, pagesErrors) {
    if (pagesErrors.length > 0) {
      if (onError) {
        onError(pagesErrors);
      }
      errors.addPortion(pagesErrors);
      errors.send();
      return;
    }

    this.lists[fillRequestId] = pagesResults;
    this.sets[fillRequestId] = this._prepareSet(pagesResults);
    onSuccess(this.lists[fillRequestId], this.sets[fillRequestId]);
  }

  _prepareSet(formsList) {
    let forms = {};

    for (let idx in formsList) {
      let currentForm = formsList[idx];
      forms[currentForm.filled_form_id] = currentForm;
    }
    return forms;
  }
}

export default new FormsCache();
