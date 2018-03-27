import { srvGetSelectionState } from '../../lib/service-functions';

class Documents {
  constructor() {
    this.tree = [];
    this.set = {};
    this.selectedDocumentId = 0;
  }

  load(tree, set) {
    this.set = set;
    this.tree = tree;
  }

  getSelectedDocument() {
    return (this.selectedDocumentId in this.set)
      ? this.set[this.selectedDocumentId] : null;
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

  getSelectionState(documentId) {
    return srvGetSelectionState(documentId, this.selectedDocumentId);
  }
}

export default new Documents();
