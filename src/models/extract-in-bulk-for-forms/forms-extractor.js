import fillRequestForms from './fill-request-forms';
import formsFields from './forms-fields';

class FormsExtractor {
  constructor() {
    this.insertType = 0;
  }

  getInsertType() {
    return this.insertType;
  }

  setInsertType(insertType) {
    this.insertType = parseInt(insertType);
  }

  insertFormsData(unlockScreenCallback) {
    let formsData = this._getFormsData();

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(formsData, this.insertType);
  }

  isButtonDisabled() {
    let loading = formsFields.isLoading();
    let fields = formsFields.getFields();
    let noSelectedFields = (fields.findIndex((item) => {return item.flag;}) === -1);
    return (loading || noSelectedFields) ? true : null;
  }

  _getFormsData() {
    let selectedForms = fillRequestForms.getSelectedForms();
    let fields = formsFields.getFields();
    let formsHeader = this._getFormsHeader();
    let formsData = [formsHeader];

    for (let formIdx in selectedForms) {
      let currentForm = selectedForms[formIdx];

    }
    return formsData;
  }

  _getFormsHeader() {
    let fields = formsFields.getFields();
    let header = [];

    for (let idx in fields) {
      let currentField = fields[idx];

      if (currentField.flag) {
        header.push(currentField.name);
      }
    }
    return header;
  }
}

export default new FormsExtractor();
