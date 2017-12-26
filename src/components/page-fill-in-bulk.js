import m from 'mithril';
import PageLoading from './page-loading';
import RowHeader from './row-header';
import RowDocumentSelector from './row-document-selector';
import RowDocumentId from './row-document-id';
import RowDocumentFolder from './row-document-folder';
import RowFolderSelector from './row-folder-selector';
import labels from '../labels';
import pages from '../models/pages';

class PageFillInBulk {
  oninit() {
    if (!pages.pageFillInBulkIsLoaded()) {
      pages.loadPageFillInBulk(() => {m.redraw();});
    }
  }

  view() {
    if (!pages.pageFillInBulkIsLoaded()) {
      return m(PageLoading);
    }

    return m('div', {class: 'container'}, [
      m(RowHeader, {pageLabel: labels.l_1}),
      m(RowDocumentSelector),
      m(RowDocumentId),
      m(RowDocumentFolder),
      m(RowFolderSelector)
    ]);
  }
}

export default PageFillInBulk;
