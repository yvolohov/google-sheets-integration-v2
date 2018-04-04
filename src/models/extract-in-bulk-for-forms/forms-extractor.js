import ObjectsExtractor from '../classes/objects-extractor';
import fillRequestForms from './fill-request-forms';
import formsFields from './forms-fields';
import formsFieldsCache from '../common/forms-fields-cache';

class FormsExtractor extends ObjectsExtractor {
  constructor() {
    super();
  }

  extract(unlockScreenCallback) {
    let forms = fillRequestForms.getSelectedForms();
    let fields = formsFields.getFields();
    let cacheCallback = (cache, form) => {
      return cache.getFormFieldsAsSet(form.fillRequestId, form.filledFormId);
    };

    let formsData = this._getData(
      forms,
      fields,
      cacheCallback.bind(this, formsFieldsCache)
    );

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(formsData, this.insertType);
  }

  isButtonDisabled() {
    let noSelectedFields = (formsFields.getFields().findIndex((item) => {return item.flag;}) === -1);
    return (formsFields.isLoading() || noSelectedFields) ? true : null;
  }
}

export default new FormsExtractor();
