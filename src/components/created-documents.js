import m from 'mithril';
import BasePage from './base-page';
import PageHeader from './common/page-header';
import labels from '../labels';

class CreatedDocuments extends BasePage {
  constructor() {
    super([]);
  }

  view() {
    return m('div', {class: 'container'}, [
      m(PageHeader, {pageLabel: labels.l_39})
    ]);
  }
}

export default CreatedDocuments;
