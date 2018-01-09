import MultipageRequest from '../lib/multipage-request';

class Documents {
  constructor() {
    this.tree = [];
    this.documents = {};
    this.selectedDocumentId = 0;
  }

  load() {
    let multipageRequest = new MultipageRequest('ccGetDocuments');
    multipageRequest.setPerPage(100);

    return multipageRequest.get(
      this._pageCallback.bind(this),
      this._postCallback.bind(this)
    );
  }

  getSelectedDocument() {
    return (this.selectedDocumentId in this.documents)
      ? this.documents[this.selectedDocumentId] : null;
  }

  getSelectedDocumentId() {
    return this.selectedDocumentId;
  }

  setSelectedDocumentId(documentId) {
    this.selectedDocumentId = parseInt(documentId);
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

      if (!currentDocument.fillable) {
        continue;
      }
      results.push(currentDocument);
    }
  }

  _postCallback(results, errors) {
    let tree = [];
    let documents = {};
    let addedFolders = {};

    for (let documentId in results) {
      let currentDocument = results[documentId];
      let folderId = currentDocument.folder.folder_id;
      let folderName = currentDocument.folder.name;
      documents[currentDocument.id] = currentDocument;

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
      currentFolder.documents.sort(this._sortDocumentsCallback.bind(this));
    }
    tree.sort(this._sortFoldersCallback.bind(this));
    this.documents = documents;
    this.tree = tree;
  }

  _sortFoldersCallback(a, b) {
    return (a.id === 0) ? -1 : ((b.id === 0) ? 1 : this._sortDocumentsCallback(a, b));
  }

  _sortDocumentsCallback(a, b) {
    return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
  }
}

export default new Documents();
