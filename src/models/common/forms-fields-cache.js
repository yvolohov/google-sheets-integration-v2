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

    let formFields = new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((response) => {resolve(response);})
        .ccGetFilledFormFields(fillRequestId, filledFormId);
    });

    formFields.then((response) => {
      if (response.responseCode !== 200) {
        if (onError) {
          onError(response);
        }
        errors.addPortion([response]);
        errors.send();
        return;
      }

      //
      console.log(response);     
    });
  }

  _getFullId(fillRequestId, filledFormId) {
    return `${fillRequestId}:${filledFormId}`;
  }
}

export default new FormsFieldsCache();
