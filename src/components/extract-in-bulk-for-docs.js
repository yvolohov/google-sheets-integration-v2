import m from 'mithril';
import PageLoading from './page-loading';
import RowHeader from './common/row-header';
import labels from '../labels';
import modelsLoader from '../models/common/models-loader';

class ExtractInBulkForDocs {
  constructor() {
    this.models = ['documents'];
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
      m(RowHeader, {pageLabel: labels.l_2})
    ]);
  }
}

export default ExtractInBulkForDocs;
