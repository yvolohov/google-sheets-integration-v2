import fieldsLoader from '../common/fields-loader';

class DocumentFields {
  constructor() {
    this.loading = false;
    this.fieldsList = [];
  }

  isLoading() {
    return this.loading;
  }

  getFields() {
    return this.fieldsList;
  }

  selectField(fieldName, flag) {
    let fieldIdx = this.fieldsList.findIndex((item) => {
      return (item.name === fieldName);
    });

    if (fieldIdx > -1) {
      this.fieldsList[fieldIdx].flag = flag;
    }
  }

  moveField(idx, up) {
    let currentPosition = idx;
    let newPosition = (up) ? idx - 1 : idx + 1;

    if (newPosition < 0 || newPosition >= this.fieldsList.length) {
      return;
    }
    let remembered = this.fieldsList[newPosition];
    this.fieldsList[newPosition] = this.fieldsList[currentPosition];
    this.fieldsList[currentPosition] = remembered;
  }

  refreshFields(documentId, onSuccess, onError) {
    this.fieldsList = [];

    if (parseInt(documentId) === 0) {
      onSuccess();
      return;
    }

    this.loading = true;

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

      this.fieldsList.push({
        name: currentField.name,
        type: currentField.type,
        flag: true
      });
    }
  }
}

export default new DocumentFields();
