import MultipageRequest from '../../lib/multipage-request';
import firstDocuments from '../fill-in-bulk/documents';
import secondDocuments from '../extract-in-bulk-for-docs/documents';
import thirdDocuments from '../get-editor-access-links/documents';

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
    firstDocuments.load(this.documents);
    secondDocuments.load(this.documents);
    thirdDocuments.load(this.documents);
  }
}

export default new Documents();
