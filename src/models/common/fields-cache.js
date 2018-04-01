import errors from './errors';

class FieldsCache {
  constructor() {
    this.sets = {};
    this.lists = {};
  }

  loadFields(documentId, onSuccess, onError=null) {
    if (documentId in this.lists) {
      onSuccess(this.lists[documentId], this.sets[documentId]);
      return;
    }

    let fields = new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((response) => {resolve(response);})
        .ccGetDocumentFields(documentId);
    });

    fields.then((response) => {
      if (response.responseCode !== 200) {
        if (onError) {
          onError(response);
        }
        errors.addPortion([response]);
        errors.send();
        return;
      }

      let fieldsList = this._prepareList(response.responseContent);
      this.lists[documentId] = fieldsList;
      this.sets[documentId] = this._prepareSet(fieldsList);
      onSuccess(this.lists[documentId], this.sets[documentId]);
    });
  }

  getFieldsAsList(documentId) {
    return (documentId in this.lists) ? this.lists[documentId] : [];
  }

  getFieldsAsSet(documentId) {
    return (documentId in this.sets) ? this.sets[documentId] : {};
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

export default new FieldsCache();
