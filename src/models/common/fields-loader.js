import errors from './errors';

class FieldsLoader {
  constructor() {
    this.sets = {};
    this.lists = {};
  }

  loadFields(documentId, callback) {
    if (documentId in this.lists) {
      callback(this.lists[documentId], this.sets[documentId]);
      return;
    }

    let fields = new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((response) => {resolve(response);})
        .ccGetDocumentFields(documentId);
    });

    fields.then((response) => {
      if (response.responseCode !== 200) {
        errors.addPortion([response]);
        errors.send();
        return;
      }

      let fieldsList = this._prepareList(response.responseContent);
      this.lists[documentId] = fieldsList;
      this.sets[documentId] = this._prepareSet(fieldsList);
      callback(this.lists[documentId], this.sets[documentId]);
    });
  }

  getFields(documentId) {
    return (documentId in this.lists) ? this.lists[documentId] : [];
  }

  markField(documentId, fieldName, flag) {
    if (!(documentId in this.sets)) {
      return;
    }

    let selectedDocumentFields = this.sets[documentId];

    if (fieldName in selectedDocumentFields) {
      let currentField = selectedDocumentFields[fieldName];
      currentField.flag = flag;
    }
  }

  _prepareList(rawContent) {
    let fields = [];

    for (let fieldIndex in rawContent) {
      let currentField = rawContent[fieldIndex];

      if (currentField.type === 'image' || currentField.type === 'signature') {
        continue;
      }

      if (!currentField.fillable) {
        continue;
      }
      currentField['flag'] = true;
      fields.push(currentField);
    }
    return fields;
  }

  _prepareSet(fieldsList) {
    let fields = {};

    for (let fieldIndex in fieldsList) {
      let currentField = fieldsList[fieldIndex];
      fields[currentField.name] = currentField;
    }
    return fields;
  }
}

export default new FieldsLoader();
