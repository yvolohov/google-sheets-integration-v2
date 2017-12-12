import m from 'mithril';
import RowHeader from './row-header';
import labels from '../labels';

class PageGetDocumentFields {
  view() {
    return m('div', {class: 'container'}, [
      m(RowHeader, {pageLabel: labels.l_2})
    ]);
  }
}

export default PageGetDocumentFields;
