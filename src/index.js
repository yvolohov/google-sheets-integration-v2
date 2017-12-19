import m from 'mithril';
import PageLoading from './components/page-loading';
import PageMenu from './components/page-menu';
import PageFillInBulk from './components/page-fill-in-bulk';
import PageGetDocumentFields from './components/page-get-document-fields';
import PageGetFormFields from './components/page-get-form-fields';
import PageGetEditorAccessLink from './components/page-get-editor-access-link';

import documents from './models/documents';
import folders from './models/folders';

m.route(document.getElementById('content'), '/page-loading', {
  '/page-loading': PageLoading,
  '/page-menu': PageMenu,
  '/page-fill-in-bulk': PageFillInBulk,
  '/page-get-document-fields': PageGetDocumentFields,
  '/page-get-form-fields': PageGetFormFields,
  '/page-get-editor-access-link': PageGetEditorAccessLink
});

Promise.all([
  documents.load(),
  folders.load()
])
.then((result) => {
  m.route.set('/page-menu');
});
