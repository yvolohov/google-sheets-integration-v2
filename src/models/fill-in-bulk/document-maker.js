import documents from './documents';
import errors from '../common/errors';

class DocumentMaker {
  constructor() {

  }

  isButtonDisabled() {
    return (documents.getSelectedDocumentId() === 0) ? true : null;
  }
}

export default new DocumentMaker();
