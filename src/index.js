import m from 'mithril';
import PageLoading from './components/page-loading';
import Menu from './components/menu';
import FillInBulk from './components/fill-in-bulk';
import ExtractInBulkForDocs from './components/extract-in-bulk-for-docs';
import ExtractInBulkForForms from './components/extract-in-bulk-for-forms';
import GetEditorAccessLinks from './components/get-editor-access-links';

m.route(document.getElementById('content'), '/menu', {
  '/menu': Menu,
  '/fill-in-bulk': FillInBulk,
  '/extract-in-bulk-for-docs': ExtractInBulkForDocs,
  '/extract-in-bulk-for-forms': ExtractInBulkForForms,
  '/get-editor-access-links': GetEditorAccessLinks
});
