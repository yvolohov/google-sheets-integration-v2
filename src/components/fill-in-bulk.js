import m from 'mithril';
import PageLoading from './page-loading';
import PageHeader from './common/page-header';
import DocumentSelector from './fill-in-bulk/document-selector';
import FieldsList from './fill-in-bulk/fields-list';
import DataHeaderSection from './fill-in-bulk/data-header-section';
import FolderSelector from './fill-in-bulk/folder-selector';
import FillFormsButton from './fill-in-bulk/fill-forms-button';
import labels from '../labels';
import modelsLoader from '../models/common/models-loader';

class FillInBulk {
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
      m(PageHeader, {pageLabel: labels.l_1}),
      m(DocumentSelector),
      m(FieldsList),
      m(DataHeaderSection),
      m(FolderSelector),
      m(FillFormsButton)
    ]);
  }
}

export default FillInBulk;
