import fieldsLoader from '../common/fields-loader';

class DocumentsFields {
  constructor() {
    this.loading = false;
    this.fieldsList = [];
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
    console.log('add fields:' + documentId);
  }

  _removeFieldsFromList(documentId) {
    console.log('remove fields:' + documentId);
  }
}

export default new DocumentsFields();
