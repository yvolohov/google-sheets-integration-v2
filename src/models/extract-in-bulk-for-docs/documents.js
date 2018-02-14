class Documents {
  constructor() {
    this.tree = [];
    this.set = {};
  }

  load(tree, set) {
    this.tree = tree;
    this.set = set;
  }
}

export default new Documents();
