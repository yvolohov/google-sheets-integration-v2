import fieldsLoader from '../common/fields-loader';

class DocumentsFields {
  constructor() {
    this.loading = false;
    this.fieldsList = [];
  }

  refreshFields(documentId, flag, callback) {
    this.loading = true;

    if (flag) {
      fieldsLoader.loadFields(documentId, (list, set) => {
        this._addFieldsToList(callback);
      });
    }
    else {
      this._removeFieldsFromList(callback);
    }
  }

  _addFieldsToList(list, set, callback) {
    // adding
    console.log('add fields');
    this.loading = false;
    callback();
  }

  _removeFieldsFromList(callback) {
    //removing
    console.log('remove fields');
    this.loading = false;
    callback();
  }
}

export default new DocumentsFields();
