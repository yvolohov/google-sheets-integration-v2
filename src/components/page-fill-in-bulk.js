import m from 'mithril';
import PageLoading from './page-loading';
import RowHeader from './row-header';
import RowDocumentSelector from './row-document-selector';
import RowDocumentId from './row-document-id';
import RowDocumentFolder from './row-document-folder';
import RowFieldsList from './row-fields-list';
import RowHeaderSelector from './row-header-selector';
import RowFolderSelector from './row-folder-selector';
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
      m(RowFolderSelector)
    ]);
  }
}

export default PageFillInBulk;
