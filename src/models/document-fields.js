import errors from './errors';

class DocumentFields {
  constructor() {
    this.fields = {};
    this.fieldsByName = {};
    this.selectedDocumentId = 0;
  }

  getDocumentFields() {
    return (this.selectedDocumentId in this.fields)
      ? this.fields[this.selectedDocumentId] : [];
  }

  getDocumentId() {
    return this.selectedDocumentId;
  }

  selectField(fieldName, checkboxChecked) {
    if (!(this.selectedDocumentId in this.fieldsByName)) {
      return;
    }

    let currentDocumentFieldsByName = this.fieldsByName[this.selectedDocumentId];

    if (fieldName in currentDocumentFieldsByName) {
      let currentField = currentDocumentFieldsByName[fieldName];
      currentField.checkboxChecked = checkboxChecked;
    }
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
        let fieldsList = this._prepareFields(response.responseContent);
        this.fields[documentId] = fieldsList;
        this.fieldsByName[documentId] = this._prepareFieldsByName(fieldsList);
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

  _prepareFields(rawContent) {
    let fields = [];

    for (let fieldIndex in rawContent) {
      let currentField = rawContent[fieldIndex];
      currentField['checkboxChecked'] = true;
      fields.push(currentField);
    }
    return fields;
  }

  _prepareFieldsByName(fieldsList) {
    let fields = {};

    for (let fieldIndex in fieldsList) {
      let currentField = fieldsList[fieldIndex];
      fields[currentField.name] = currentField;
    }
    return fields;
  }
}

export default new DocumentFields();
