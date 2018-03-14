import documents from './documents';
import errors from '../common/errors';

class DocsExtractor {
  constructor() {
    this.insertType = 0;
  }

  getInsertType() {
    return this.insertType;
  }

  setInsertType(insertType) {
    this.insertType = parseInt(insertType);
  }  
}

export default new DocsExtractor();
