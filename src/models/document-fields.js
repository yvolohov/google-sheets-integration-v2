import errors from './errors';

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
      if (response.responseCode === 200) {
        this.fields[documentId] = response.responseContent;
      }
      else {
        errors.addPortion([response]);
        errors.send();
      }

      console.log(response.responseContent);

      if (callback !== null) {
        callback();
      }
    });
  }
}

export default new DocumentFields();
