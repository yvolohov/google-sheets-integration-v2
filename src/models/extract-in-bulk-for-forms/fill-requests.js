import MultipageRequest from '../../lib/multipage-request';
import { srvGetSelectionState } from '../../lib/service-functions';

class FillRequests {
  constructor() {
    this.list = [];
    this.fillRequests = {};
    this.selectedFillRequestId = 0;
  }

  load() {
    let multipageRequest = new MultipageRequest('ccGetFillRequests');
    multipageRequest.setPerPage(100);

    return multipageRequest.get(
      this._pageCallback.bind(this),
      this._postCallback.bind(this)
    );
  }

  getSelectedFillRequest() {
    return (this.selectedFillRequestId in this.fillRequests)
      ? this.fillRequests[this.selectedFillRequestId] : null;
  }

  getSelectedFillRequestId() {
    return this.selectedFillRequestId;
  }

  setSelectedFillRequestId(fillRequestId) {
    this.selectedFillRequestId = parseInt(fillRequestId);
  }

  getFillRequestsList() {
    return this.list;
  }

  getSelectionState(fillRequestId) {
    return srvGetSelectionState(fillRequestId, this.selectedFillRequestId);
  }

  _pageCallback(response, results, errors) {
    if (response.responseCode !== 200) {
      errors.push(response);
      return;
    }

    let fillRequests = response.responseContent.items;

    for (let fillRequestId in fillRequests) {
      let currentFillRequest = fillRequests[fillRequestId];

      if (!(currentFillRequest.filled_forms_count > 0)) {
        continue;
      }
      results.push(currentFillRequest);
    }
  }

  _postCallback(results, errors) {
    let fillRequests = {};

    for (let fillRequestId in results) {
      let currentFillRequest = results[fillRequestId];
      fillRequests[currentFillRequest.fillable_form_id] = currentFillRequest;
    }

    results.sort(this._sortFillRequestsCallback.bind(this));
    this.fillRequests = fillRequests;
    this.list = results;
  }

  _sortFillRequestsCallback(a, b) {
    return (a.document_name.toLowerCase() > b.document_name.toLowerCase()) ? 1 : -1;
  }
}

export default new FillRequests();
