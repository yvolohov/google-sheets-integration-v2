import MultipageRequest from '../lib/multipage-request';

class Documents {
  constructor() {
    this.list = [];
  }

  loadList() {
    let multipageRequest = new MultipageRequest('ccGetDocuments');
    multipageRequest.setPerPage(15);

    return multipageRequest.get(
      this._pageCallback,
      this._postCallback
    );
  }

  _pageCallback(response, results, errors) {
    if (response.responseCode !== 200) {
      errors.push(response);
      return;
    }

    let documents = response.responseContent.items;

    for (let documentId in documents) {
      let currentDocument = documents[documentId];
      results.push(currentDocument);
    }
  }

  _postCallback(results, errors) {
    let folderSet = {};

    for (let documentId in results) {
      let currentDocument = results[documentId];
      let folderId = currentDocument.folder.folder_id;
      let folderName = currentDocument.folder.name;

      if (!(folderId in folderSet)) {
        folderSet[folderId] = {
          id: folderId,
          name: folderName,
          documents: []
        };
      }

      folderSet[folderId].documents.push({
          id: currentDocument.id,
          name: currentDocument.name,
          folderName: folderName
      });
    }

    console.log(folderSet);
  }
}

export default new Documents();
