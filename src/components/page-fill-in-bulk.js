import m from 'mithril';
import RowHeader from './row-header';
import RowDocumentSelector from './row-document-selector';
import labels from '../labels';

class PageFillInBulk {
  view() {
    return m('div', {class: 'container'}, [
      m(RowHeader, {pageLabel: labels.l_1}),
      m(RowDocumentSelector, {selectLabel: labels.l_5})
    ]);
  }
}

export default PageFillInBulk;
