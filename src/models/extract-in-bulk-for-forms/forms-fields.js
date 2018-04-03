import formsFieldsCache from '../common/forms-fields-cache';
import { srvSelectListItem, srvMoveListItem } from '../../lib/service-functions';

class FormsFields {
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

  refreshFields(fillRequestId, filledFormId, flag, onSuccess, onError) {
    this.loading = true;

    let localOnSuccess = (list, set) => {
      console.log(list, set);
      this.loading = false;
      onSuccess();
    };

    let localOnError = (response) => {
      this.loading = false;
      onError();
    };

    formsFieldsCache.loadFormFields(fillRequestId, filledFormId, localOnSuccess, localOnError);
  }
}

export default new FormsFields();
