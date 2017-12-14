class Documents {
  constructor() {
    this.list = [];
  }

  loadList() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 4000);
    });
  }
}

export default new Documents();
