import errors from './errors';

class DocumentFields {
  constructor() {
    this.fields = {};
    this.selectedDocumentId = 0;
  }

  getDocumentFields() {
    return (this.selectedDocumentId in this.fields)
      ? this.fields[this.selectedDocumentId] : [];
  }

  getDocumentId() {
    return this.selectedDocumentId;
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
        this.fields[documentId] = this._prepareContent(response.responseContent);
      }
      else {
        errors.addPortion([response]);
        errors.send();
      }

      if (callback !== null) {
        callback();
      }
    });
  }

  _prepareContent(rawContent) {
    let fields = [];

    for (let fieldIndex in rawContent) {
      let currentField = rawContent[fieldIndex];
      currentField['checkboxChecked'] = true;
      fields.push(currentField);
    }
    return fields;
  }
}

export default new DocumentFields();
