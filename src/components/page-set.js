import m from 'mithril';
import PageMenu from './page-menu';
import PageFillInBulk from './page-fill-in-bulk';
import PageGetDocumentFields from './page-get-document-fields';
import PageGetFormFields from './page-get-form-fields';
import PageGetEditorAccessLink from './page-get-editor-access-link';

class PageSet {
  view() {
    return m('div', {id: 'page-set'}, [
      m(PageMenu),
      m(PageFillInBulk),
      m(PageGetDocumentFields),
      m(PageGetFormFields),
      m(PageGetEditorAccessLink)
    ]);
  }
}

export default PageSet;
