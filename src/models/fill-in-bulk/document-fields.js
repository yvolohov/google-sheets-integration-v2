import fieldsLoader from '../common/fields-loader';

class DocumentFields {
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

  selectField(fieldName, flag) {
    let fieldIdx = this.fieldsList.findIndex((item) => {
      return (item.name === fieldName);
    });

    if (fieldIdx > -1) {
      this.fieldsList[fieldIdx].flag = flag;
    }
  }

  moveField(idx, up) {
    let currentPosition = idx;
    let newPosition = (up) ? idx - 1 : idx + 1;

    if (newPosition < 0 || newPosition >= this.fieldsList.length) {
      return;
    }
    let remembered = this.fieldsList[newPosition];
    this.fieldsList[newPosition] = this.fieldsList[currentPosition];
    this.fieldsList[currentPosition] = remembered;
  }

  refreshFields(documentId, onSuccess, onError) {
    // метод-заглушка
    this.fieldsList = [];

    this.fieldsList.push({
      name: 'FieldOne',
      type: 'text',
      flag: false
    });
    this.fieldsList.push({
      name: 'FieldTwo',
      type: 'text',
      flag: false
    });
    this.fieldsList.push({
      name: 'FieldThree',
      type: 'text',
      flag: false
    });

    onSuccess();
  }
}

export default new DocumentFields();
