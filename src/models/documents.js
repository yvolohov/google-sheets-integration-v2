import MultipageRequest from '../lib/multipage-request';

class Documents {
  constructor() {
    this.tree = [];
  }

  loadList() {
    let multipageRequest = new MultipageRequest('ccGetDocuments');
    multipageRequest.setPerPage(100);

    return multipageRequest.get(
      this._pageCallback.bind(this),
      this._postCallback.bind(this)
    );
  }

  getFoldersTree() {
    return this.tree;
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
    let tree = [];
    let addedFolders = {};
    let sortCallback = (a, b) => {
      return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
    };

    for (let documentId in results) {
      let currentDocument = results[documentId];
      let folderId = currentDocument.folder.folder_id;
      let folderName = currentDocument.folder.name;

      if (!(folderId in addedFolders)) {
        tree.push({
          id: folderId,
          name: folderName,
          documents: []
        });
        addedFolders[folderId] = tree.length - 1;
      }

      let folderIndex = addedFolders[folderId];
      let folder = tree[folderIndex];

      folder.documents.push({
        id: currentDocument.id,
        name: currentDocument.name,
        folderName: folderName
      });
    }

    for (let folderId in tree) {
      let currentFolder = tree[folderId];
      currentFolder.documents.sort(sortCallback);
    }
    tree.sort(sortCallback);
    this.tree = tree;
  }
}

export default new Documents();
