import fieldsLoader from '../common/fields-loader';

class DocumentsFields {
  constructor() {
    this.loading = false;
    this.fieldsList = [];
  }

  getFields() {
    return this.fieldsList;
  }

  selectField(fieldName, flag) {
    let fieldIdx = this.fieldsList.findIndex((item) => {
      return (item.name === fieldName);
    });

    if (fieldIdx > -1) {
      this.fieldsList[fieldName].flag = flag;
    }
  }

  refreshFields(documentId, flag, onSuccess, onError) {
    this.loading = true;

    if (!flag) {
      this._removeFieldsFromList(documentId);
      this.loading = false;
      onSuccess();
      return;
    }

    let localOnSuccess = (list, set) => {
      this._addFieldsToList(documentId, list, set);
      this.loading = false;
      onSuccess();
    };

    let localOnError = (response) => {
      this.loading = false;
      onError();
    };

    fieldsLoader.loadFields(documentId, localOnSuccess, localOnError);
  }

  _addFieldsToList(documentId, list, set) {
    for (let currentFieldIdx in list) {
      let currentField = list[currentFieldIdx];
      let fieldIdx = this.fieldsList.findIndex((item) => {
        return (item.name === currentField.name);
      });

      if (fieldIdx > -1) {
        this.fieldsList[fieldIdx].count++;
      }
      else {
        this.fieldsList.push({name: currentField.name, flag: true, count: 1});
      }
    }
  }

  _removeFieldsFromList(documentId) {
    let list = fieldsLoader.getFields(documentId);

    for (let currentFieldIdx in list) {
      let currentField = list[currentFieldIdx];

      let fieldIdx = this.fieldsList.findIndex((item) => {
        return (item.name === currentField.name);
      });

      if (fieldIdx === -1) {
        continue;
      }

      let field = this.fieldsList[fieldIdx];

      if (field.count > 1) {
        field.count--;
        continue;
      }
      this.fieldsList.splice(fieldIdx, 1);
    }
  }
}

export default new DocumentsFields();
