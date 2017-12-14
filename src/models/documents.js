class Documents {
  constructor() {
    this.list = [];
  }

  loadList() {
    return new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((documents) => {
          console.log(documents);
          resolve(true);
        })
        .ccGetDocuments(1);
    });
  }
}

export default new Documents();
