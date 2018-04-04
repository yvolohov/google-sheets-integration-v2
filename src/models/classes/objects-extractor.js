export const DOCUMENT_ID = '_DOC_ID_';
export const DOCUMENT_NAME = '_DOC_NAME_';
export const LINK_TO_FILL_ID = '_L2F_ID_';
export const FILLED_FORM_ID = '_FORM_ID_';
export const USER_NAME = '_USER_NAME_';
export const USER_EMAIL = '_USER_EMAIL_';

class ObjectsExtractor {
  constructor() {
    this.insertType = 0;
  }

  getInsertType() {
    return this.insertType;
  }

  setInsertType(insertType) {
    this.insertType = parseInt(insertType);
  }

  _getData(objects, fields, cacheCallback) {
    let header = fields
      .filter((item) => {return item.flag;})
      .map((item) => {return item.name;});
    let table = [header];

    for (let objIdx in objects) {
      let currentObject = objects[objIdx];
      let currentObjectFields = cacheCallback(currentObject);
      let row = [];

      for (let fldIdx in fields) {
        let currentField = fields[fldIdx];
        let name = currentField.name;
        let value = '';

        if (!currentField.flag) {
          continue;
        }

        if (!currentField.service) {
          value = (name in currentObjectFields) ? currentObjectFields[name].value : '';
        }
        else {
          value = this._getValueForServiceField(name, currentObject);
        }
        row.push(value);
      }
      table.push(row);
    }
    return table;
  }

  _getValueForServiceField(fieldName, obj) {
    let value = '';

    switch (fieldName) {
      case DOCUMENT_ID:
        value = obj.id;
        break;

      case DOCUMENT_NAME:
        value = obj.name;
        break;

      case LINK_TO_FILL_ID:
        value = obj.fillRequestId;
        break;

      case FILLED_FORM_ID:
        value = obj.filledFormId;
        break;

      case USER_NAME:
        value = obj.name;
        break;

      case USER_EMAIL:
        value = obj.email;
        break;
    }
    return value;
  }
}

export default ObjectsExtractor;
