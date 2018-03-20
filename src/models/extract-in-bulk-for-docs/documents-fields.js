import fieldsLoader from '../common/fields-loader';

class DocumentsFields {
  constructor() {
    this.selectedFieldsList = [];
  }

  refreshFields(documentId, flag, callback) {
    console.log(documentId, flag);
    callback();
  }
}

export default new DocumentsFields();
