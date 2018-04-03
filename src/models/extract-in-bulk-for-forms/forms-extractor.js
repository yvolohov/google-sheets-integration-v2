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

  isButtonDisabled() {
    let loading = formsFields.isLoading();
    let fields = formsFields.getFields();
    let noSelectedFields = (fields.findIndex((item) => {return item.flag;}) === -1);
    return (loading || noSelectedFields) ? true : null;
  }

  insertFormsData(unlockScreenCallback) {
    unlockScreenCallback();
  }
}

export default new FormsExtractor();
