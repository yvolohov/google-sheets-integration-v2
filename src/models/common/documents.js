class Documents {
  constructor() {
    this.tree = [];
    this.set = {};
    this.selectedDocumentsList = [];
    this.flagName = '';
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

  setFlagName(flagName) {
    this.flagName = flagName;
  }

  selectDocument(documentId, flag) {
    if (documentId in this.set) {
      let selectedDocument = this.set[documentId];
      selectedDocument[this.flagName] = flag;
      this._refreshSelectedDocumentsList(selectedDocument, flag);
    }
  }

  moveSelectedDocument(idx, up) {
    console.log(idx, up);
  }

  _refreshSelectedDocumentsList(selectedDocument, flag) {
    if (flag) {
      this.selectedDocumentsList.push(selectedDocument);
      return;
    }

    let idx = this.selectedDocumentsList.findIndex((item) => {
      return (item.id === selectedDocument.id);
    });

    if (idx > -1) {
      this.selectedDocumentsList.splice(idx, 1);
    }
  }
}

export default Documents;
