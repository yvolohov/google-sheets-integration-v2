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
}

export default new FormsFields();
