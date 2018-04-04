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

  _isButtonDisabled(fieldsModel) {
    let loading = fieldsModel.isLoading();
    let fields = fieldsModel.getFields();
    let noSelectedFields = (fields.findIndex((item) => {return item.flag;}) === -1);
    return (loading || noSelectedFields) ? true : null;
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

  _getHeader(fieldsModel) {
    let fields = fieldsModel.getFields();
    let header = [];

    for (let idx in fields) {
      let currentField = fields[idx];

      if (currentField.flag) {
        header.push(currentField.name);
      }
    }
    return header;
  }
}

export default ObjectsExtractor;
