import ObjectsExtractor from '../classes/objects-extractor';
import fillRequestForms from './fill-request-forms';
import formsFields from './forms-fields';
import formsFieldsCache from '../common/forms-fields-cache';

class FormsExtractor extends ObjectsExtractor {
  constructor() {
    super();
  }

  extract(unlockScreenCallback) {
    let formsHeader = this._getHeader(formsFields);
    let formsData = this._getFormsData(formsHeader);

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(formsData, this.insertType);
  }

  isButtonDisabled() {
    let noSelectedFields = (formsFields.getFields().findIndex((item) => {return item.flag;}) === -1);
    return (formsFields.isLoading() || noSelectedFields) ? true : null;
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
          value = this._getValueForServiceField(name, currentForm);
        }
        else {
          value = (name in currentFormFields) ? currentFormFields[name].value : '';
        }
        formData.push(value);
      }
      formsData.push(formData);
    }
    return formsData;
  }
}

export default new FormsExtractor();
