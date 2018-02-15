import m from 'mithril';
import BasePage from './base-page';
import PageHeader from './common/page-header';
import DocumentsList from './extract-in-bulk-for-docs/documents-list';
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
      m(DocumentsList)
    ]);
  }
}

export default ExtractInBulkForDocs;