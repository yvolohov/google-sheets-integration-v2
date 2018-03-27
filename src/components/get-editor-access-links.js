import m from 'mithril';
import BasePage from './base-page';
import PageHeader from './common/page-header';
import DocumentsList from './common/documents-list';
import SelectedDocumentsList from './common/selected-documents-list.js';
import LinksMakerSection from './get-editor-access-links/links-maker-section';
import documents from '../models/get-editor-access-links/documents';
import labels from '../labels';

class GetEditorAccessLinks extends BasePage {
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
      m(PageHeader, {pageLabel: labels.l_4}),
      m(DocumentsList, {
        documents: documents,
        documentsFields: null,
        flagName: 'flagTwo'
      }),
      m(SelectedDocumentsList, {model: documents}),
      m(LinksMakerSection)
    ]);
  }
}

export default GetEditorAccessLinks;
