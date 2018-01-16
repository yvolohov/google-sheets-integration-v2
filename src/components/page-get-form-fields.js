import m from 'mithril';
import PageLoading from './page-loading';
import RowHeader from './common/row-header';
import RowFillRequestSelector from './get-form-fields/row-fill-request-selector';
import RowFillRequestId from './get-form-fields/row-fill-request-id';
import RowFilledFormsList from './get-form-fields/row-filled-forms-list';
import labels from '../labels';
import modelsLoader from '../models/models-loader';

class PageGetFormFields {
  constructor() {
    this.models = ['fillRequests'];
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
      m(RowHeader, {pageLabel: labels.l_3}),
      m(RowFillRequestSelector),
      m(RowFillRequestId),
      m(RowFilledFormsList)
    ]);
  }
}

export default PageGetFormFields;
