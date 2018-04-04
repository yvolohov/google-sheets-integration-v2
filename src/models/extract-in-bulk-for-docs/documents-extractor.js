import ObjectsExtractor from '../classes/objects-extractor';
import documents from './documents';
import documentsFields from './documents-fields';
import fieldsCache from '../common/fields-cache';

class DocumentsExtractor extends ObjectsExtractor {
  constructor() {
    super();
  }

  extract(unlockScreenCallback) {
    let docs = documents.getSelectedDocumentsList();
    let fields = documentsFields.getFields();
    let cacheCallback = (cache, doc) => {
      return cache.getFieldsAsSet(doc.id);
    };

    let documentsData = this._getData(
      docs,
      fields,
      cacheCallback.bind(this, fieldsCache)
    );

    google.script.run
      .withSuccessHandler(unlockScreenCallback)
      .withFailureHandler(unlockScreenCallback)
      .ccInsertDocumentsData(documentsData, this.insertType);
  }

  isButtonDisabled() {
    let noSelectedFields = (documentsFields.getFields().findIndex((item) => {return item.flag;}) === -1);
    return (documentsFields.isLoading() || noSelectedFields) ? true : null;
  }
}

export default new DocumentsExtractor();
