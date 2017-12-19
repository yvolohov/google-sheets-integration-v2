import m from 'mithril';
import RowHeader from './row-header';
import RowDocumentSelector from './row-document-selector';
import RowDocumentId from './row-document-id';
import RowDocumentFolder from './row-document-folder';
import labels from '../labels';

class PageFillInBulk {
  view() {
    return m('div', {class: 'container'}, [
      m(RowHeader, {pageLabel: labels.l_1}),
      m(RowDocumentSelector),
      m(RowDocumentId),
      m(RowDocumentFolder)
    ]);
  }
}

export default PageFillInBulk;
