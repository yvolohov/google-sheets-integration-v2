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
}

export default new Documents();
