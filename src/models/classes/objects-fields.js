import { srvSelectListItem, srvMoveListItem } from '../../lib/service-functions';

class ObjectsFields {
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

  selectField(fieldName, isService, flag) {
    let callback = (item) => {
      return (item.name === fieldName && item.service === isService);
    };
    srvSelectListItem(this.fieldsList, callback, flag);
  }

  moveField(idx, up) {
    srvMoveListItem(this.fieldsList, idx, up);
  }

  cleanFields() {
    this.fieldsList = [];
  }

  _addFieldToList(fieldName, isService) {
    let fieldIdx = this.fieldsList.findIndex((item) => {
      return (item.name === fieldName && item.service === isService);
    });

    if (fieldIdx > -1) {
      this.fieldsList[fieldIdx].count++;
      return;
    }

    this.fieldsList.push({
      name: fieldName,
      flag: !isService,
      count: 1,
      service: isService
    });
  }

  _removeFieldFromList(fieldName, isService) {
    let fieldIdx = this.fieldsList.findIndex((item) => {
      return (item.name === fieldName && item.service === isService);
    });

    if (fieldIdx === -1) {
      return;
    }

    let foundField = this.fieldsList[fieldIdx];

    if (foundField.count > 1) {
      foundField.count--;
      return;
    }
    this.fieldsList.splice(fieldIdx, 1);
  }
}

export default ObjectsFields;
