import m from 'mithril';
import BasePage from './base-page';
import PageHeader from './common/page-header';
import FilledDocumentsList from './filled-in-bulk-documents/filled-documents-list';
import labels from '../labels';

class FilledInBulkDocuments extends BasePage {
  constructor() {
    super([]);
  }

  view() {
    return m('div', {class: 'container'}, [
      m(PageHeader, {pageLabel: labels.l_39}),
      m(FilledDocumentsList)
    ]);
  }
}

export default FilledInBulkDocuments;
