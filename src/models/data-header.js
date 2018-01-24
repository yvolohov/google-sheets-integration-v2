import errors from './errors';

class DataHeader {
  constructor() {
    this.createNewSheet = false;
  }

  getNewSheetFlag() {
    return this.createNewSheet;
  }

  setNewSheetFlag(flag) {
    this.createNewSheet = flag;
  }

  createDataHeader(headerType) {
    console.log(headerType);
  }
}

export default new DataHeader();
