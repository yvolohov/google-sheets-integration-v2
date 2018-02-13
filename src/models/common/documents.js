import MultipageRequest from '../../lib/multipage-request';

class Documents {
  constructor() {
    this.documents = [];
  }

  load() {
    let multipageRequest = new MultipageRequest('ccGetDocuments');
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

    let documents = response.responseContent.items;

    for (let documentId in documents) {
      results.push(documents[documentId]);
    }
  }

  _postCallback(results, errors) {
    this.documents = results;
    /* HERE WE CAN LOAD ANOTHER DOCUMENTS MODELS */
    console.log(this.documents);
  }
}

export default new Documents();
