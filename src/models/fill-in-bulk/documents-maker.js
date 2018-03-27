import documents from './documents';
import errors from '../common/errors';

class DocumentsMaker {
  constructor() {

  }

  isButtonDisabled() {
    return (documents.getSelectedDocumentId() === 0) ? true : null;
  }
}

export default new DocumentsMaker();
