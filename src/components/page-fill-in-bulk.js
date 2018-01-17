import m from 'mithril';
import PageLoading from './page-loading';
import RowHeader from './common/row-header';
import RowDocumentSelector from './fill-in-bulk/row-document-selector';
import RowDocumentId from './fill-in-bulk/row-document-id';
import RowDocumentFolder from './fill-in-bulk/row-document-folder';
import RowFieldsList from './fill-in-bulk/row-fields-list';
import RowHeaderSelector from './fill-in-bulk/row-header-selector';
import RowFolderSelector from './fill-in-bulk/row-folder-selector';
import RowNewFolderName from './fill-in-bulk/row-new-folder-name';
import RowFillFormsButton from './fill-in-bulk/row-fill-forms-button'
import labels from '../labels';
import modelsLoader from '../models/models-loader';

class PageFillInBulk {
  constructor() {
    this.models = ['documents', 'folders'];
  }

  oninit() {
    let notLoaded = modelsLoader.getNotLoadedModels(this.models);

    if (notLoaded.length > 0) {
      modelsLoader.loadModels(notLoaded, () => {m.redraw();});
    }
  }

  view() {
    let notLoaded = modelsLoader.getNotLoadedModels(this.models);

    if (notLoaded.length > 0) {
      return m(PageLoading);
    }

    return m('div', {class: 'container'}, [
      m(RowHeader, {pageLabel: labels.l_1}),
      m(RowDocumentSelector),
      m(RowDocumentId),
      m(RowDocumentFolder),
      m(RowFieldsList),
      m(RowHeaderSelector),
      m(RowFolderSelector),
      m(RowNewFolderName),
      m(RowFillFormsButton)
    ]);
  }
}

export default PageFillInBulk;
