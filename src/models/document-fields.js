class DocumentFields {
  constructor() {
    this.fields = {};
    this.selectedDocumentId = 0;
  }

  getDocumentFields() {
    return (this.selectedDocumentId in this.fields)
      ? this.fields[this.selectedDocumentId] : null;
  }

  setFields(documentId, callback=null) {
    this.selectedDocumentId = documentId;

    if (this.selectedDocumentId == 0 || (this.selectedDocumentId in this.fields)) {
      if (callback !== null) {
        callback();
      }
    }
    else {
      this._loadFields(documentId, callback);
    }
  }

  _loadFields(documentId, callback) {
    let fields = new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((response) => {resolve(response);})
        .ccGetDocumentFields(documentId);
    });

    fields.then((response) => {
      // проверить код 200, обработать данные
      this.fields[documentId] = response;
      console.log(response);

      if (callback !== null) {
        callback();
      }
    });
  }
}

export default new DocumentFields();
