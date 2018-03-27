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
    return (parseInt(documentId) === this.selectedDocumentId) ? 'selected' : null;
  }
}

export default new Documents();
