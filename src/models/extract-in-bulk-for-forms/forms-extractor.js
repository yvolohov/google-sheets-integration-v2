class FormsExtractor {
  constructor() {
    this.insertType = 0;
  }

  getInsertType() {
    return this.insertType;
  }

  setInsertType(insertType) {
    this.insertType = parseInt(insertType);
  }

  isButtonDisabled() {
    return false;
  }
}

export default new FormsExtractor();
