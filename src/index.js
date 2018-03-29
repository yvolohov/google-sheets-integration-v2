import m from 'mithril';
import Menu from './components/menu';
import Loading from './components/loading';
import FillInBulk from './components/fill-in-bulk';
import ExtractInBulkForDocs from './components/extract-in-bulk-for-docs';
import ExtractInBulkForForms from './components/extract-in-bulk-for-forms';
import GetEditorAccessLinks from './components/get-editor-access-links';
import CreatedDocuments from './components/created-documents';

m.route(document.getElementById('content'), '/menu', {
  '/menu': Menu,
  '/loading': Loading,
  '/fill-in-bulk': FillInBulk,
  '/extract-in-bulk-for-docs': ExtractInBulkForDocs,
  '/extract-in-bulk-for-forms': ExtractInBulkForForms,
  '/get-editor-access-links': GetEditorAccessLinks,
  '/created-documents': CreatedDocuments
});
