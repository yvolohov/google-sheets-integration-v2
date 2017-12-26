import m from 'mithril';
import PageLoading from './components/page-loading';
import PageMenu from './components/page-menu';
import PageFillInBulk from './components/page-fill-in-bulk';
import PageGetDocumentFields from './components/page-get-document-fields';
import PageGetFormFields from './components/page-get-form-fields';
import PageGetEditorAccessLink from './components/page-get-editor-access-link';

m.route(document.getElementById('content'), '/page-menu', {
  '/page-menu': PageMenu,
  '/page-fill-in-bulk': PageFillInBulk,
  '/page-get-document-fields': PageGetDocumentFields,
  '/page-get-form-fields': PageGetFormFields,
  '/page-get-editor-access-link': PageGetEditorAccessLink
});
