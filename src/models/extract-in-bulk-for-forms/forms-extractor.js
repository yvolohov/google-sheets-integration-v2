import BaseExtractor from '../classes/base-extractor';
import fillRequestForms from './fill-request-forms';
import formsFields from './forms-fields';
import formsFieldsCache from '../common/forms-fields-cache';
import { LINK_TO_FILL_ID, FILLED_FORM_ID, USER_NAME, USER_EMAIL } from '../classes/base-extractor';

class FormsExtractor extends BaseExtractor {
  constructor() {
    super();
  }

  insertFormsData(unlockScreenCallback) {
    let formsHeader = super._getHeader(formsFields);
    let formsData = this._getFormsData(formsHeader);

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(formsData, this.insertType);
  }

  isButtonDisabled() {
    return super._isButtonDisabled(formsFields);
  }

  _getFormsData(formsHeader) {
    let selectedForms = fillRequestForms.getSelectedForms();
    let fields = formsFields.getFields();
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
          value = super._getValueForServiceField(name, currentForm);
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
}

export default new FormsExtractor();
