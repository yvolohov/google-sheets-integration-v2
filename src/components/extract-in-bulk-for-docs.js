import m from 'mithril';
import BasePage from './base-page';
import PageHeader from './common/page-header';
import DocumentsList from './common/documents-list';
import SelectedDocumentsList from './common/selected-documents-list.js';
import DocsExtractorSection from './extract-in-bulk-for-docs/docs-extractor-section';
import documents from '../models/extract-in-bulk-for-docs/documents';
import documentsFields from '../models/extract-in-bulk-for-docs/documents-fields';
import labels from '../labels';

class ExtractInBulkForDocs extends BasePage {
  constructor() {
    super(['documents']);
  }

  oninit() {
    this.loadModels();
  }

  view() {
    if (!this.areModelsLoaded()) {
      return this.getLoadingScreen();
    }

    return m('div', {class: 'container'}, [
      m(PageHeader, {pageLabel: labels.l_2}),
      m(DocumentsList, {
        documents: documents,
        documentsFields: documentsFields,
        flagName: 'flagOne'
      }),
      m(SelectedDocumentsList, {model: documents}),
      m(DocsExtractorSection)
    ]);
  }
}

export default ExtractInBulkForDocs;
