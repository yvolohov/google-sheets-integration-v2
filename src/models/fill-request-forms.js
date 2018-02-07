import MultipageRequest from '../lib/multipage-request';
import errors from './errors';

class FillRequestForms {
  constructor() {
    this.filledForms = {};
    this.selectedFillRequestId = 0;
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
      this._postCallback.bind(this)
    );
  }

  _pageCallback(response, results, errors) {
    console.log(response.responseContent);
  }

  _postCallback(results, errors) {

  }
}

export default new FillRequestForms();
