class LinkMaker {
  constructor() {
    this.lifetime = 365;
    this.insertType = 0;
  }

  getInsertType() {
    return this.insertType;
  }

  setInsertType(insertType) {
    this.insertType = parseInt(insertType);
  }

  getLifetime() {
    return this.lifetime;
  }

  setLifetime(lifetime) {
    this.lifetime = parseInt(lifetime);
  }
}

export default new LinkMaker();
