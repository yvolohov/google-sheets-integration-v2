import MultipageRequest from '../lib/multipage-request';

class FillRequests {
  constructor() {

  }

  load() {
    let multipageRequest = new MultipageRequest('ccGetFillRequests');
    multipageRequest.setPerPage(100);

    return multipageRequest.get(
      this._pageCallback.bind(this),
      this._postCallback.bind(this)
    );
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
    console.log(results);
  }
}

export default new FillRequests();
