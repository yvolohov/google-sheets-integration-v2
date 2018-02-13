import m from 'mithril';
import modelsLoader from '../models/common/models-loader';
import labels from '../labels';

class BasePage {
  constructor(models) {
    this.models = models;
  }

  loadModels() {
    let notLoaded = modelsLoader.getNotLoadedModels(this.models);

    if (notLoaded.length > 0) {
      modelsLoader.loadModels(notLoaded, () => {m.redraw();});
    }
  }

  areModelsLoaded() {
    let notLoaded = modelsLoader.getNotLoadedModels(this.models);
    return (notLoaded.length === 0);
  }

  getLoadingScreen() {
    return m('div', {class: 'container'}, [
      m('div', {class: 'row'}, [
        m('div', {class: 'col-12-sm', style: 'text-align: center;'}, [
          m('b', {class: 'gray'}, labels.l_6)
        ])
      ])
    ]);
  }
}

export default BasePage;
