class Documents {
  constructor() {
    this.tree = [];
    this.set = {};
  }

  load(tree, set) {
    this.tree = tree;
    this.set = set;
  }

  getFoldersTree() {
    return this.tree;
  }

  selectDocument(documentId, flag) {
    if (documentId in this.set) {
      this.set[documentId].flagTwo = flag;
    }
  }
}

export default new Documents();
