import errors from './errors';

class FormsFieldsCache {
  constructor() {
    this.sets = {};
    this.lists = {};
  }

  loadFormFields(fillRequestId, filledFormId, onSuccess, onError=null) {
    let fullId = this._getFullId(fillRequestId, filledFormId);

    if (fullId in this.lists) {
      onSuccess(this.lists[fullId], this.sets[fullId]);
      return;
    }

    //
  }

  _getFullId(fillRequestId, filledFormId) {
    return `${fillRequestId}:${filledFormId}`;
  }
}

export default new FormsFieldsCache();
