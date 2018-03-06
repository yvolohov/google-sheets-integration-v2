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
    this.documents = results.map((currentDocument) => {
      currentDocument['flagOne'] = false;
      currentDocument['flagTwo'] = false;
      return currentDocument;
    });

    let allDocuments = this.documents;
    let fillableDocuments = this.documents.filter(
      (item) => {return (item.fillable);}
    );

    let allTree = this._makeDocumentsTree(allDocuments);
    let allSet = this._makeDocumentsSet(allDocuments);
    let fillableTree = this._makeDocumentsTree(fillableDocuments);
    let fillableSet = this._makeDocumentsSet(fillableDocuments);

    firstDocuments.load(fillableTree, fillableSet);
    secondDocuments.load(fillableTree, fillableSet);
    thirdDocuments.load(allTree, allSet);
  }

  _makeDocumentsSet(documentsList) {
    let set = {};

    for (let documentIdx in documentsList) {
      let currentDocument = documentsList[documentIdx];
      set[currentDocument.id] = currentDocument;
    }
    return set;
  }

  _makeDocumentsTree(documentsList) {
    let tree = [];
    let addedFolders = {};

    for (let documentIdx in documentsList) {
      let currentDocument = documentsList[documentIdx];
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
      folder.documents.push(currentDocument);
    }

    for (let folderId in tree) {
      let currentFolder = tree[folderId];
      currentFolder.documents.sort(this._sortDocumentsCallback.bind(this));
    }

    tree.sort(this._sortFoldersCallback.bind(this));
    return tree;
  }

  _sortFoldersCallback(a, b) {
    return (a.id === 0) ? -1 : ((b.id === 0) ? 1 : this._sortDocumentsCallback(a, b));
  }

  _sortDocumentsCallback(a, b) {
    return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
  }
}

export default new Documents();
