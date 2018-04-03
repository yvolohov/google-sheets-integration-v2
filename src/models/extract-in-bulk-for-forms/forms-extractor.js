import BaseExtractor from '../classes/base-extractor';
import fillRequestForms from './fill-request-forms';
import formsFields from './forms-fields';
import formsFieldsCache from '../common/forms-fields-cache';
import { LINK_TO_FILL_ID, FILLED_FORM_ID, USER_NAME, USER_EMAIL } from '../classes/base-extractor';

class FormsExtractor extends BaseExtractor {
  constructor() {
    super();
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
      let currentFormFields = formsFieldsCache.getFormFieldsAsSet(
        currentForm.fillRequestId,
        currentForm.filledFormId
      );
      let formData = [];

      for (let fldIdx in fields) {
        let currentField = fields[fldIdx];
        let name = currentField.name;
        let value = '';

        if (!currentField.flag) {
          continue;
        }

        if (currentField.service) {
          value = this._getValueForServiceField(name, currentForm);
        }
        else {
          value = (name in currentFormFields) ? currentFormFields[name].content : '';
        }
        formData.push(value);
      }
      formsData.push(formData);
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
