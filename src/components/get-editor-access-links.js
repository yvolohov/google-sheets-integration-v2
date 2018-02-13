import m from 'mithril';
import PageLoading from './page-loading';
import PageHeader from './common/page-header';
import labels from '../labels';
import modelsLoader from '../models/common/models-loader';

class GetEditorAccessLinks {
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
      m(PageHeader, {pageLabel: labels.l_4})
    ]);
  }
}

export default GetEditorAccessLinks;
