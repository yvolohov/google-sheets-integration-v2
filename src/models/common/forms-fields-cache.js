import Extractor from 'prop-extractor';
import errors from './errors';

const extractor = new Extractor();

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

      extractor.setPath('response_content.pages.[].fillable_fields.[]');
      let rawData = extractor.extractFrom(response.responseContent).get();
      let list = this._prepareList(rawData);
      this.lists[fullId] = list;
      this.sets[fullId] = this._prepareSet(list);
      onSuccess(this.lists[fullId], this.sets[fullId]);
    });
  }

  getFormFieldsAsList(fillRequestId, filledFormId) {
    let fullId = this._getFullId(fillRequestId, filledFormId);
    return (fullId in this.lists) ? this.lists[fullId] : [];
  }

  getFormFieldsAsSet(fillRequestId, filledFormId) {
    let fullId = this._getFullId(fillRequestId, filledFormId);
    return (fullId in this.sets) ? this.sets[fullId] : {};
  }

  _prepareList(rawData) {
    let fields = [];

    for (let idx in rawData) {
      let currentField = rawData[idx];
      let itemIndex = fields.findIndex((item) => {
        return (item.name === currentField.name);
      });

      if (itemIndex > -1) {
        continue;
      }
      fields.push(currentField);
    }
    return fields;
  }

  _prepareSet(fieldsList) {
    let fields = {};

    for (let fieldIndex in fieldsList) {
      let currentField = fieldsList[fieldIndex];
      fields[currentField.name] = currentField;
    }
    return fields;
  }

  _getFullId(fillRequestId, filledFormId) {
    return `${fillRequestId}:${filledFormId}`;
  }
}

export default new FormsFieldsCache();
