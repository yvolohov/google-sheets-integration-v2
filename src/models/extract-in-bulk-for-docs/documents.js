class Documents {
  constructor() {
    this.tree = [];
    this.set = {};
    this.selectedDocumentsList = [];
  }

  load(tree, set) {
    this.tree = tree;
    this.set = set;
  }

  getFoldersTree() {
    return this.tree;
  }

  getSelectedDocumentsList() {
    return this.selectedDocumentsList;
  }

  selectDocument(documentId, flag) {
    if (documentId in this.set) {
      let selectedDocument = this.set[documentId];
      selectedDocument.flagOne = flag;
      this._refreshSelectedDocumentsList(selectedDocument, flag);      
    }
  }

  _refreshSelectedDocumentsList(selectedDocument, flag) {
    if (!flag) {
      let idx = this.selectedDocumentsList.findIndex((item) => {
        return (item.id === selectedDocument.id);
      });

      if (idx > -1) {
        this.selectedDocumentsList.splice(idx, 1);
      }
    }
    else {
      this.selectedDocumentsList.push(selectedDocument);
    }
  }
}

export default new Documents();
